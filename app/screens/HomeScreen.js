import * as React from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";

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
        <View style={{ alignContent: "center" }}>
          <Image
            source={require("../assets/menuButton.png")}
            style={{
              resizeMode: "contain",
              height: 40,
            }}
          />
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text>Location: The Beehive</Text>
        </View>
        <View style={{ alignContent: "center" }}>
          <Image
            source={require("../assets/bell.png")}
            style={{
              resizeMode: "contain",
              height: 40,
            }}
          />
        </View>
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

      <SafeAreaView style={styles.footer}>
        <Image
          source={require("../assets/home.png")}
          style={{
            resizeMode: "contain",
            height: 40,
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "darkgray",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 10,
  },
  middle: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  footer: {
    flex: 0, //used to be 0.05
    backgroundColor: "yellowgreen",
    alignItems: "center",
    //justifyContent: 'bottom'//for some reason this doesnt work for me so i commented it out :(
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
