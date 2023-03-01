import * as React from "react";

import { useFonts } from "expo-font";
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

export default function HomeScreen({ navigation }) {
  const [reports, setReports] = React.useState([]);
  const reportArray = new Array();
  const dateArray = new Array();
  const timeArray = new Array();
  const dateTime = new Array();
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });
  
  //fetching info from database to display
  const fetchReports = async () => {
    const res = await Axios
      //10.0.2.2 is a general IP address for the emulator
      .get("http://10.0.2.2:3001/api/bk_appReports")
      .then((res) => {
        setReports(res.data);
      })
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
  
  var i = 0;
  reports.map((reports) => {
    reportArray[i] = [reports.address, ", ", reports.city];
    dateArray[i] = [reports.rdate];
    i++;
  });

  //dateTime conversions for homescreen display
  for (var j = 0; j < reportArray.length; j++) {
    //stringinfy the array with the date and time
    dateArray[j] = JSON.stringify(dateArray[j]);

    //split between date and time
    dateArray[j] = dateArray[j].split("T");
    var time = dateArray[j][1];

    //separate the date and its parts
    dateArray[j] = dateArray[j][0].split('"');
    dateArray[j] = dateArray[j][1].split("-");

    //extract time from the date array
    timeArray[j] = time.split(".");
    //separate hours, minutes, seconds
    timeArray[j] = timeArray[j][0];
    timeArray[j] = timeArray[j].split(":");
    ///////////////////////////////////////

    //convert the date array to logical format of integers
    var month = parseInt(dateArray[j][1]);
    var day = parseInt(dateArray[j][2]);
    dateArray[j] = [month, "/", day];

    //convert time array to logical format of integers with am and pm
    var hour = parseInt(timeArray[j][0]);
    var minute = parseInt(timeArray[j][1]);
    var am_pm = "am";
    if (hour <= 12) {
      am_pm = "pm";
    }

    hour = hour % 12;
    if (hour == 0) {
      hour = 12;
    }
    timeArray[j] = [hour, ":", minute, " ", am_pm];

    //put date and time into one array to use for display
    dateTime[j] = [dateArray[j], " at ", timeArray[j]];
  }

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AccountScreen", {
              screen: "AccountScreen",
            })
          }
        >
          <Image
            source={require("../assets/menuButton.png")}
            style={{
              resizeMode: "contain",
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontFamily: "Comfortaa", fontSize: 16 }}>
          Location: Orangevale
        </Text>
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
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.textBox}>Change location</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => fetchReports()}>
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
          <TouchableOpacity
            onPress={() => {
              var specificReport = reports.filter(obj => {
                return obj.r_id === reports[0].r_id
              })[0];

              navigation.navigate("ReportInfoScreen", {
                screen: "ReportInfoScreen",
                report: specificReport,
              });
            }}
          >
            <View style={styles.task}>
              <View style={styles.taskText}>
                <Text value={{}} style={{ fontSize: 16 }}>
                  A swarm has been reported at {reportArray[0]}
                </Text>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/x.png")}
                    style={styles.xButton}
                  ></Image>
                </TouchableOpacity>
              </View>
              <Text>{dateTime[0]}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              var specificReport = reports.filter(obj => {
                return obj.r_id === reports[1].r_id
              })[0];

              navigation.navigate("ReportInfoScreen", {
                screen: "ReportInfoScreen",
                report: specificReport,
              });
            }}
          >
            <View style={styles.task}>
              <View style={styles.taskText}>
                <Text style={{ fontSize: 16 }}>
                  A swarm has been reported at {reportArray[1]}
                </Text>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/x.png")}
                    style={styles.xButton}
                  ></Image>
                </TouchableOpacity>
              </View>
              <Text>{dateTime[1]}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              var specificReport = reports.filter(obj => {
                return obj.r_id === reports[2].r_id
              })[0];

              navigation.navigate("ReportInfoScreen", {
                screen: "ReportInfoScreen",
                report: specificReport,
              });
            }}
          >
            <View style={styles.task}>
              <View style={styles.taskText}>
                <Text value={{}} style={{ fontSize: 16 }}>
                  A swarm has been reported at {reportArray[2]}
                </Text>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/x.png")}
                    style={styles.xButton}
                  ></Image>
                </TouchableOpacity>
              </View>
              <Text>{dateTime[2]}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              var specificReport = reports.filter(obj => {
                return obj.r_id === reports[3].r_id
              })[0];

              navigation.navigate("ReportInfoScreen", {
                screen: "ReportInfoScreen",
                report: specificReport,
              });
            }}
          >
            <View style={styles.task}>
              <View style={styles.taskText}>
                <Text value={{}} style={{ fontSize: 16 }}>
                  A swarm has been reported at {reportArray[3]}
                </Text>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/x.png")}
                    style={styles.xButton}
                  ></Image>
                </TouchableOpacity>
              </View>
              <Text>{dateTime[3]}</Text>
            </View>
          </TouchableOpacity>
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
