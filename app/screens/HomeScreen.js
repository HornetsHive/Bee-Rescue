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
} from "react-native";

import ReportRibbon from "../components/ReportRibbon";

export default function HomeScreen({ route, navigation }) {
  const userID = route.params.bk_id;
  const [reportRawData, setReportRawData] = React.useState([]);
  const [formattedReportArray, updateReportArray] = React.useState([]);

  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  function formattedReport(id, location, date) {
    this.reportID = id;
    this.formattedLocation = location;
    this.formattedDate = date;
  }

  //fetching reports from database to display
  const fetchReports = async () => {
    const res = await Axios
      //10.0.2.2 is a general IP address for the emulator
      .get("http://10.0.2.2:3001/api/bk_appReports")
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

      var toPush = new formattedReport(
        reports.r_id,
        formattedLocation,
        formattedDate
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontFamily: "Comfortaa", fontSize: 16 }}>
          Location: Orangevale
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AccountScreen", {
              screen: "AccountScreen",
            })
          }
        >
          <Image
            source={require("../assets/person.png")}
            style={{
              resizeMode: "contain",
              height: 25,
              width: 30,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SettingsScreen", {
              screen: "SettingsScreen",
            })
          }
        >
          <Image
            source={require("../assets/bell.png")}
            style={{
              resizeMode: "contain",
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyReportsHomeScreen", {
              screen: "MyReportsHomeScreen",
            })
          }
        >
          <Image
            source={require("../assets/myReportButton.png")}
            style={{
              resizeMode: "contain",
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.middle}>
        <Image
          source={require("../assets/map.png")}
          style={{
            alignSelf: "center",
            resizeMode: "contain",
            height: 180,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity>
            <Image
              source={require("../assets/sort.png")}
              style={{
                resizeMode: "contain",
                margin: 10,
                height: 30,
                width: 30,
              }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => {
              console.log("Going to info: " + 1);
              navigation.navigate("ReportInfoScreen", {
                screen: "ReportInfoScreen",
                report: 1,
              });
            }}
          >
            <Text style={styles.textBox}>Change location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => fetchReports().then(console.log("Updated reports"))}
          >
            <Image
              source={require("../assets/refresh.png")}
              style={{
                resizeMode: "contain",
                margin: 10,
                height: 30,
                width: 30,
              }}
            ></Image>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {/*---------------Start of scroll---------------*/}
          {formattedReportArray.map((report, key) => (
            <ReportRibbon
              key={key}
              id={report.reportID}
              location={report.formattedLocation}
              date={report.formattedDate}
              nav={navigation}
              rawSQL={reportRawData}
            />
          ))}
          {/*--------------End of scroll-----------------*/}
        </ScrollView>
      </View>

      <SafeAreaView>
        <ImageBackground
          source={require("../assets/gradient1.png")}
          style={styles.footer}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HomeScreen", { screen: "HomeScreen" })
            }
          >
            <Image
              source={require("../assets/home.png")}
              style={{
                resizeMode: "contain",
                height: 40,
                width: 40,
              }}
            />
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignSelf: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.2,
    top: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "darkgray",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  middle: {
    flex: 1.5,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  footer: {
    flex: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    height: 65,
    width: "100%",
  },
  textBox: {
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
});
