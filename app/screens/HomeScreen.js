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
    i++;
  });

  //for (var j = 0; j < reportArray.length; j++) {
  //console.log(j + 1, ": ", reportArray[j]);
  //}

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
            onPress={() =>
              navigation.navigate("ReportInfoScreen", {
                screen: "ReportInfoScreen",
              })
            }
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
              <Text>[time]</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReportInfoScreen", {
                screen: "ReportInfoScreen",
              })
            }
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
              <Text>[time]</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReportInfoScreen", {
                screen: "ReportInfoScreen",
              })
            }
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
              <Text>[time]</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReportInfoScreen", {
                screen: "ReportInfoScreen",
              })
            }
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
              <Text>[time]</Text>
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
