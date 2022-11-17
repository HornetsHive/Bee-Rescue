import * as React from "react";
import { useFonts } from "expo-font";
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
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: "darkgray" }}
      ></SafeAreaView>

      <View style={styles.header}>
        <Image
          source={require("../assets/menuButton.png")}
          style={{
            resizeMode: "contain",
            height: 40,
          }}
        />
        <Text style={{ left: 110 }}>Location: The Beehive</Text>
        <Image
          source={require("../assets/bell.png")}
          style={{
            resizeMode: "contain",
            height: 40,
            left: 40,
          }}
        />
      </View>

      <View style={styles.middle}>
        <Image
          source={require("../assets/map.jpg")}
          style={{
            resizeMode: "stretch",
            height: 380,
          }}
        />
      </View>

      <View style={styles.middle}>
        <View style={styles.task}>
          <Text>Task</Text>
        </View>
        <View style={styles.task}>
          <Text>Task</Text>
        </View>
        <View style={styles.task}>
          <Text>Task</Text>
        </View>
        <View style={styles.task}>
          <Text>Task</Text>
        </View>
        <View style={styles.task}>
          <Text>Task</Text>
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
            style={{ left: -60, bottom: 15, resizeMode: "contain", height: 40 }}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: "column",
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.2,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "darkgray",
    alignItems: "center",
    justifyContent: "space-evenly",
    left: 60,
    margin: 10,
  },
  middle: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  footer: {
    bottom: -40,
    alignItems: "center",
    resizeMode: "cover",
    height: 70,
    width: "100%",
  },
  task: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "darkgray",
  },
});
