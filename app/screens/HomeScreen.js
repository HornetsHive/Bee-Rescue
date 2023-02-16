import * as React from "react";
import { useFonts } from "expo-font";
import axios from "axios";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [reports, setReports] = useState([]);
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loaded) {
    return null;
  }

  //fetching info from database to display
  const showReports = async () => {
    const res = await axios
      //replace localhost with user's local IP address for reports to show display
      .get("http://localhost:3001/api/bk_appReports")
      .then((res) => {
        setReports(res.data);
      })
      .then((res) => console.log(res.data))
      .catch(function (error) {
        if (error.response) {
          //The request was made and the server responded with a status code
          //that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          //console.log(error.response.headers);
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AccountScreen", { screen: "AccountScreen" })
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
        <Text style={{ fontFamily: "Comfortaa", fontSize: 15, width: 180 }}>
          Location: Orangevale
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SettingsScreen", { screen: "SettingsScreen" })
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
        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.textBox}>Change location</Text>
        </TouchableOpacity>

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
          <View style={styles.textContainer}>
            <Text style={styles.textBox}>Recent Activity</Text>
          </View>
          <TouchableOpacity onPress={() => showReports()}>
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

        <View style={styles.task}>
          <View style={styles.taskText}>
            <Text value={{}} style={{ fontSize: 16 }}></Text>
            <View>
              {reports.map((reports, index) => (
                <Text key={index}>
                  {reports.address} {reports.city}; {reports.location}
                </Text>
              ))}
            </View>
            <TouchableOpacity>
              <Image
                source={require("../assets/x.png")}
                style={styles.xButton}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text>
            {reports.map((reports, index) => (
              <Text key={index}>{reports.rdate}, </Text>
            ))}
          </Text>
        </View>

        <View style={styles.task}>
          <View style={styles.taskText}>
            <Text style={{ fontSize: 16 }}>
              A swarm has been reported in Orangevale
            </Text>
            <TouchableOpacity>
              <Image
                source={require("../assets/x.png")}
                style={styles.xButton}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text>Wednesday at 4:35pm</Text>
        </View>

        <View style={styles.task}>
          <View style={styles.taskText}>
            <Text style={{ fontSize: 16 }}>
              A swarm has been reported in Orangevale
            </Text>
            <TouchableOpacity>
              <Image
                source={require("../assets/x.png")}
                style={styles.xButton}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text>Tuesday at 12:03pm</Text>
        </View>

        <View style={styles.task}>
          <View style={styles.taskText}>
            <Text style={{ fontSize: 16 }}>
              A swarm has been reported in Orangevale
            </Text>
            <TouchableOpacity>
              <Image
                source={require("../assets/x.png")}
                style={styles.xButton}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text>Monday at 5:32pm</Text>
        </View>
      </View>

      <SafeAreaView>
        <Image
          source={require("../assets/gradient1.png")}
          style={styles.footer}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("HomeScreen", { screen: "HomeScreen" })
          }
        >
          <Image
            source={require("../assets/home.png")}
            style={{
              alignSelf: "center",
              bottom: 15,
              resizeMode: "contain",
              height: 40,
              width: 40,
            }}
          />
        </TouchableOpacity>
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
    flex: 2.5,
    justifyContent: "center",
    borderColor: "lightgray",
    borderWidth: 1,
  },
  footer: {
    flex: 0,
    bottom: -40,
    alignItems: "center",
    resizeMode: "cover",
    height: 70,
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
    borderWidth: 0.5,
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
