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
  TouchableOpacity,
} from "react-native";

export default function MyReportsScreen({ navigation }) {
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loaded) {
    return null;
  }

  //fetching info from database to display
  showReports = () => {
    Axios.get("http://localhost:3001/api/bk_appReports")
      .then((res) => {
        const data = res.data;
        console.log("db data:");
        console.log(data);
      })
      .catch(function (error) {
        //promise eror with Axios
        console.log("There has been a problem with your fetch operation");
        throw error;
      });
  };
  completeReport = () => {
    Axios.post("http://localhost:3001/api/complete_report", {
      r_id: 0, //dummy value must get the actual report id
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("HomeScreen", { screen: "HomeScreen" })
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
        <Text style={{ fontFamily: "Comfortaa", fontSize: 17, width: 125 }}>
          Report Info
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SettingsScreen", { screen: "SettingsScreen" })
          }
        ></TouchableOpacity>
      </View>

      <ScrollView style={styles.middle}>
        <View style={{ height: 57, top: 10, bottom: 100 }}>
          <TouchableOpacity
            style={{
              padding: 8,
              margin: 10,
              borderRadius: 10,
              backgroundColor: "#d3e954",
            }}
            onPress={() => completeReport()} // NEED TO IMPLEMENT its kinda there now
          >
            <Text style={{ textAlign: "center", fontFamily: "Comfortaa" }}>
              Complete
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 57, top: 10, bottom: 100 }}>
          <TouchableOpacity
            style={{
              padding: 8,
              margin: 10,
              borderRadius: 10,
              backgroundColor: "#d3e954",
            }}
            onPress={() => abandonReport()} // NEED TO IMPLEMENT
          >
            <Text style={{ textAlign: "center", fontFamily: "Comfortaa" }}>
              Abandon
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.itemTall}>
          <View style={styles.label}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 17,
                fontWeight: "bold",
                bottom: 7,
              }}
            >
              Address
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.content}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 15,
                width: "80%",
                top: 7,
              }}
            >
              123 Maple Street, Sacramento, CA 12345
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.label}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Duration
            </Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.content}>
            <Text style={{ fontFamily: "Comfortaa", fontSize: 15 }}>
              content
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.label}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Location
            </Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.content}>
            <Text style={{ fontFamily: "Comfortaa", fontSize: 15 }}>
              content
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.label}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Height
            </Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.content}>
            <Text style={{ fontFamily: "Comfortaa", fontSize: 15 }}>
              content
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.label}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Size
            </Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.content}>
            <Text style={{ fontFamily: "Comfortaa", fontSize: 15 }}>
              content
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.label}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Category
            </Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.content}>
            <Text style={{ fontFamily: "Comfortaa", fontSize: 15 }}>
              content
            </Text>
          </View>
        </View>
      </ScrollView>

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
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 10,
    overflow: "scroll",
  },
  footer: {
    flex: 0,
    bottom: -40,
    alignItems: "center",
    resizeMode: "cover",
    height: 70,
    width: "100%",
  },
  item: {
    flexDirection: "row",
    height: 55,
  },
  itemTall: {
    flexDirection: "row",
    height: 105,
    top: 25,
  },
  label: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  divider: {
    width: 2,
    top: 12,
    height: "50%",
    margin: 6,
    backgroundColor: "darkgray",
  },
  content: {
    flex: 0,
    padding: 15,
    flexWrap: "wrap",
  },
});
