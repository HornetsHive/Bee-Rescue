import * as React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import ReportRibbon from "../components/ReportRibbon";
import GoogleMap from "../components/GoogleMap";
import { useFonts } from "expo-font";
import Axios from "axios";
import {
  Text,
  View,
  Alert,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { KEY } from "@env";

export default function HomeScreen({ route, navigation }) {
  const userID = route.params.bk_id;
  const [city, setCity] = useState("");
  const [homeCoords, setHomeCoords] = useState({
    latitude: 38.56,
    longitude: -121.42,
  });
  const [formattedReportArray, updateReportArray] = useState([]);
  const [reportCoordinates, updateReportCoordinates] = useState([]);
  const [reverseOrder, setReverseOrder] = useState(false);
  const isFocused = useIsFocused();

  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  async function getUserCity() {
    const extractTextBetweenQuotes = (str) => str.match(/"(.*?)"/)?.[1] || "";

    const storageCity = await AsyncStorage.getItem("storedCity");

    if (!isNaN(storageCity) && storageCity != null) {
      const city = extractTextBetweenQuotes(storageCity);
      console.log("city from storage: " + city);
      setCity(city);
    } else {
      console.log("City not found in storage, getting from server");
      try {
        const res = await Axios.get("https://beerescue.net:3001/bk_getUser", {
          params: { bk_id: userID, key: KEY },
        });
        console.log("city from server: " + res.data[0].city);
        console.log(res.data);
        const city = res.data[0].city;
        console.log("city from server: " + city);

        await AsyncStorage.setItem("storedCity", JSON.stringify(city));
        console.log(
          "string after extraction: " + extractTextBetweenQuotes(city)
        );
        setCity(extractTextBetweenQuotes(city));
        console.log("City saved to storage");
      } catch (err) {
        console.log(err.response.data);
        Alert.alert(
          err.message,
          "Something went wrong processing your request",
          [{ text: "OK" }]
        );
      }
    }
  }

  async function getuserHomeCoordinates() {
    const lat = parseFloat(JSON.parse(await AsyncStorage.getItem("homeLat")));
    const lng = parseFloat(JSON.parse(await AsyncStorage.getItem("homeLng")));
    console.log("getuserHomeCoordinates: " + lat + ", " + lng);
    // if the coords aren't there they return as NaN, not null
    if (!isNaN(lat) && !isNaN(lng)) {
      console.log("Home coordinates loaded from storage");
      setHomeCoords({ latitude: lat, longitude: lng });
    } else {
      console.log("Home coordinates not found in storage, getting from server");
      try {
        const res = await Axios.get("https://beerescue.net:3001/bk_getUser", {
          params: { bk_id: userID, key: KEY },
        });
        console.log(res.data);
        const address = res.data[0].address;
        const city = res.data[0].city;
        const zip = res.data[0].zip;

        const res2 = await Axios.get("https://beerescue.net:3001/get_coords", {
          params: { address: address, city: city, zip: zip },
        });
        console.log(res2.data);

        await AsyncStorage.setItem(
          "homeLat",
          JSON.stringify(res2.data.latitude)
        );
        await AsyncStorage.setItem(
          "homeLng",
          JSON.stringify(res2.data.longitude)
        );
        await AsyncStorage.setItem("storedAddress", JSON.stringify(address));
        await AsyncStorage.setItem("storedCity", JSON.stringify(city));
        await AsyncStorage.setItem("storedZip", JSON.stringify(zip));
        console.log("Home coordinates saved to storage");

        navigation.replace("HomeScreen", {
          screen: "HomeScreen",
          bk_id: userID,
        });
      } catch (err) {
        console.log(err.response.data);
        Alert.alert(
          err.message,
          "Something went wrong processing your request",
          [{ text: "OK" }]
        );
      }
    }
  }

  function formattedReport(id, location, date, area) {
    this.reportID = id;
    this.formattedLocation = location;
    this.formattedDate = date;
    this.formattedArea = area;
  }

  //fetching reports from database to display
  const fetchReports = async () => {
    try {
      const res = await Axios.get("https://beerescue.net:3001/bk_appReports", {
        params: { key: KEY },
      }).catch((error) => {
        console.log(error);
        //leaving this one commented because it will spam the user with alerts if no connection
        //Alert.alert(error.message, "Something went wrong processing your request", [{ text: "OK" }]);
      });
      if (Array.isArray(res.data) && res.data.length > 0) {
        updateReportArray(extractReportInfo(res.data));
        updateReportCoordinates(extractReportCoordinates(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  function extractReportInfo(reportData) {
    var formatted = new Array();
    reportData.map((report) => {
      var formattedLocation = report.address + ", " + report.city;
      var rawDate = report.rdate;
      var formattedDate = makeReadableDate(rawDate);
      var formattedArea = report.city + ": (" + report.zip.slice(0, 5) + ")";

      var toPush = new formattedReport(
        report.r_id,
        formattedLocation,
        formattedDate,
        formattedArea
      );

      formatted.push(toPush);
    });
    return formatted;
  }

  function extractReportCoordinates(reportData) {
    return reportData.map((report) => {
      return {
        id: report.r_id,
        latitude: report.lat,
        longitude: report.lng,
      };
    });
  }

  const toggleReverseOrder = () => {
    setReverseOrder(!reverseOrder);
  };

  const reports = reverseOrder
    ? formattedReportArray.slice().reverse()
    : formattedReportArray;

  function makeReadableDate(dateString) {
    // Create a Date object from the dateString (in local time)
    const dateInUTC = new Date(dateString);
    const localOffsetInMs = dateInUTC.getTimezoneOffset() * 60 * 1000;
    const date = new Date(dateInUTC.getTime() + localOffsetInMs);

    // Format the date components
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(2);

    // Format the time components
    const hours24 = date.getHours();
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours24 >= 12 ? "PM" : "AM";

    // Assemble the formatted date string
    const formattedDate = `${month}/${day}/${year} ${hours12}:${minutes} ${ampm}`;

    return formattedDate;
  }

  //get reports on page load every 10 seconds
  useEffect(() => {
    const fetchAndRefreshReports = async () => {
      await fetchReports();
    };

    const interval = setInterval(() => {
      if (isFocused) {
        console.log("refreshing reports...");
        fetchAndRefreshReports();
      }
    }, 10000);

    // Call the function once before the interval starts to immediately fetch reports
    fetchAndRefreshReports();
    console.log("beekeeper ID: " + userID);

    // Clear the interval timer when the component unmount
    return () => clearInterval(interval);
  }, [isFocused]);

  //clear the report data when the component is unfocused
  useEffect(() => {
    if (!isFocused) {
      updateReportArray([]);
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      // Run when component is navigated to
      console.log("Automatic navigation refresh");
      updateReportArray([]);
      updateReportCoordinates([]);
      fetchReports();
      getUserCity();
      getuserHomeCoordinates();
    }, [])
  );

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontFamily: "Comfortaa", fontSize: 16 }}>
          Location: {city}
        </Text>
        <TouchableOpacity
          onPress={() => {
            console.log("account id: " + userID);
            navigation.navigate("AccountScreen", {
              screen: "AccountScreen",
              bk_id: userID,
            });
          }}
        >
          <Image
            source={require("../assets/person.png")}
            style={styles.iconButton}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("account id: " + userID);
            navigation.navigate("SettingsScreen", {
              screen: "SettingsScreen",
              bk_id: userID,
            });
          }}
        >
          <Image
            source={require("../assets/gear.png")}
            style={styles.iconButtonL}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("account id: " + userID);
            navigation.navigate("MyReportsHomeScreen", {
              screen: "MyReportsHomeScreen",
              bk_id: userID,
            });
          }}
        >
          <Image
            source={require("../assets/myReportButton.png")}
            style={styles.iconButton}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View height="40%">
          <GoogleMap
            reportCoordinates={reportCoordinates}
            homeCoordinates={homeCoords}
            bk_id={userID}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: "gray",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              toggleReverseOrder();
            }}
          >
            <Image
              source={require("../assets/sort.png")}
              style={styles.iconButton}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => {
              console.log("account id: " + userID);
              navigation.navigate("AccountScreen", {
                screen: "AccountScreen",
                bk_id: userID,
              });
            }}
          >
            <Text style={styles.textBox}>Change location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              fetchReports().then(
                console.log("Updated reports"),
                console.log("beekeeper ID: " + userID)
              )
            }
          >
            <Image
              source={require("../assets/refresh.png")}
              style={styles.iconButton}
            ></Image>
          </TouchableOpacity>
        </View>
        {formattedReportArray.length < 1 ? (
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Comfortaa",
                color: "grey",
              }}
            >
              no reports, check back later
            </Text>
          </View>
        ) : (
          <View></View>
        )}
        <ScrollView>
          {/*---------------Start of scroll---------------*/}
          {reports.map((report, index) => (
            <ReportRibbon
              key={index}
              id={report.reportID}
              bk_id={userID}
              location={report.formattedLocation}
              area={report.formattedArea}
              date={report.formattedDate}
              nav={navigation}
            />
          ))}
          {/*--------------End of scroll-----------------*/}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "darkgray",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  body: {
    flex: 8,
    borderColor: "gray",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  footer: {
    flex: 1,
  },
  textBox: {
    marginHorizontal: 40,
    textAlign: "center",
    fontFamily: "Comfortaa",
  },
  textContainer: {
    alignSelf: "center",
    padding: 8,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#d3e954",
  },
  task: {
    backgroundColor: "white",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "darkgray",
  },
  taskText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  xButton: {
    resizeMode: "contain",
    margin: 10,
    height: 10,
    width: 10,
  },
  iconButton: {
    height: 30,
    width: 30,
  },
  iconButtonL: {
    height: 38,
    width: 38,
  },
});
