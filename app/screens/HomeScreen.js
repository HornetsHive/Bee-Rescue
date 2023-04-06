import * as React from "react";

import { useFonts } from "expo-font";
import { useEffect } from "react";
import Axios from "axios";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import ReportRibbon from "../components/ReportRibbon";
import MapScreen from "../components/MapScreen";

export default function HomeScreen({ route, navigation }) {
  const userID = route.params.bk_id;
  const [reportRawData, setReportRawData] = React.useState([]);
  const [formattedReportArray, updateReportArray] = React.useState([]);

  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  function formattedReport(id, location, date, area) {
    this.reportID = id;
    this.formattedLocation = location;
    this.formattedDate = date;
    this.formattedArea = area
  }

  //fetching reports from database to display
  const fetchReports = async () => {
    const res = await Axios
      //10.0.2.2 is a general IP address for the emulator
      .get("http://45.33.38.54:3001/bk_appReports")
      .then((res) => {
        setReportRawData(res.data);
        updateReportArray(extractReportInfo(res.data));
      })
      //Error handling below here
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          //Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    return res;
  };

  function extractReportInfo(reportData) {
    var formatted = new Array();
    reportData.map((reports) => {
      var formattedLocation = reports.address + ", " + reports.city;
      var rawDate = reports.rdate;
      var formattedDate = makeReadableDate(rawDate);
      var formattedArea = reports.city + ": (" + reports.zip + ")";

      var toPush = new formattedReport(
        reports.r_id,
        formattedLocation,
        formattedDate,
        formattedArea
      );

      formatted.push(toPush);
    });
    return formatted;
  }

  function makeReadableDate(dateString) {
    //split date and time
    var date = dateString.split("T")[0];
    var time = dateString.split("T")[1];

    //length 3 array, 0 = year, 1 = month, 2 = day
    date = date.split("-");

    var year = date[0];
    //remove trailing zeros
    var month = parseInt(date[1]);
    var day = parseInt(date[2]);

    var formattedDate = month + "/" + day + "/" + year.slice(2);

    //length 3 array, 0 = hour, 1 = minute, 2 = second
    time = time.split(":");
    var hour = parseInt(time[0]);
    var minute = parseInt(time[1]);

    //translate from UTC to west coast time; <------ Should probably change this later to be accurate to timezone
    hour -= 8;
    //determine AM or PM
    var am_pm = "am";
    if (hour >= 12) {
      am_pm = "pm";
    }

    hour = hour % 12;
    if (hour == 0) {
      hour = 12;
    }
    var formattedTime = hour + ":" + minute + " " + am_pm;

    return formattedDate + " at " + formattedTime;
  }

  //get reports on page load
  useEffect(() => {
    // Run this function once on page load
    fetchReports();
    console.log("beekeeper ID: " + userID);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontFamily: "Comfortaa", fontSize: 16 }}>
          Location: Orangevale
        </Text>
        <TouchableOpacity
          onPress={() => {
            console.log("account id: " + userID);
            navigation.navigate("AccountScreen", {
              screen: "AccountScreen",
              bk_id: userID,
            })
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
            })
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
            })
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
          <MapScreen />
        </View>
        {/*<Image
          source={require("../assets/map.png")}
          style={{
            alignSelf: "center",
            resizeMode: "contain",
            height: 180,
          }}
        />*/}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: "gray",
          }}
        >
          <TouchableOpacity>
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
            onPress={() => fetchReports().then(console.log("Updated reports"), console.log("beekeeper ID: " + userID))}
          >
            <Image
              source={require("../assets/refresh.png")}
              style={styles.iconButton}
            ></Image>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {/*---------------Start of scroll---------------*/}
          {formattedReportArray.map((report, key) => (
            <ReportRibbon
              key={key}
              id={report.reportID}
              bk_id={userID}
              location={report.formattedLocation}
              area={report.formattedArea}
              date={report.formattedDate}
              nav={navigation}
              rawSQL={reportRawData}
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
