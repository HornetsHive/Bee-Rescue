import * as React from "react";
import { useFonts } from "expo-font";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";

export default function PreferencesScreen({ navigation }) {
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/gradient1.png")}
        resizeMode="cover"
      ></ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    height: "90%",
    fontSize: 40,
    position: "absolute",
    fontFamily: "Comfortaa",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "Comfortaa",
  },
  input: {
    height: 50,
    width: "80%",
    padding: 10,
    margin: 5,
    backgroundColor: "#d9d9d9",
    borderColor: "black",
  },
  passwordContainer: {
    justifyContent: "center",
    width: "100%",
  },
});
