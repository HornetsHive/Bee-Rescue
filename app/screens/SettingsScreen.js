import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Button,
} from "react-native";

export default function SettingsScreen() {
  const [shouldShow, setShouldShow] = useState(true);
  const [text, onChangeText] = React.useState("example@gmail.com");
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={{ fontFamily: "Comfortaa", fontSize: 20 }}>Security</Text>

      <View style={{ width: "90%", alignItems: "center", height: "50%" }}>
        <Text
          style={{
            marginRight: "70%",
            fontFamily: "Comfortaa",
            fontSize: 15,
          }}
        >
          email:
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Text
          style={{
            marginRight: "70%",
            fontFamily: "Comfortaa",
            fontSize: 15,
          }}
        ></Text>
        {shouldShow ? (
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              placeholder={"current password"}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              placeholder={"new password"}
            />
            <Button
              style={{ width: "20%" }}
              title="Save"
              onPress={() => setShouldShow(!shouldShow)}
            />
          </View>
        ) : (
          <Button
            color="#d92978"
            title="Reset Password"
            onPress={() => setShouldShow(!shouldShow)}
          />
        )}
      </View>
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
