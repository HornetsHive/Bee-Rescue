import * as React from "react";
import { useFonts } from "expo-font";
import { useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  SafeAreaView,
  TextInput,
  ScrollView,
  Switch,
} from "react-native";

export default function PreferencesScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.titleText}>Preferences</Text>
        </View>
      </ScrollView>

      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column", width: 200 }}>
            <Text style={styles.textRegular}>* First Name</Text>
            <TextInput style={styles.input} />
          </View>

          <View style={{ flexDirection: "column", width: 200 }}>
            <Text style={styles.textRegular}>* Last Name</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <Text style={styles.textRegular}>* Phone Number</Text>
        <TextInput style={styles.input} placeholder="(XXX) XXX - XXXX" />
        <Text style={styles.textRegular}>* Location Zip Code</Text>
        <TextInput style={styles.input} placeholder="e.g., 12345" />
        <Text style={styles.textRegular}>* Max swarm height preference</Text>
        <TextInput style={styles.input} placeholder="e.g., 12in, 2ft" />

        <Text style={styles.notificationText}>
          * Willing to work with other beekeepers?
        </Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#d92978" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
    flexDirection: "column",
    alignSelf: "center",
  },
  header: {
    flex: 0.1,
    padding: 10,
    alignSelf: "center",
  },
  middle: {
    top: 100,
    flex: 0.5,
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    borderWidth: 1,
  },
  titleText: {
    //alignItems: "center",
    fontSize: 40,
    fontFamily: "Comfortaa",
  },
  text: {
    //alignItems: "center",
    paddingTop: "5%",
    fontSize: 22,
    fontFamily: "Comfortaa",
  },
  textRegular: {
    fontSize: 18,
    paddingLeft: 10,
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
  notificationText: {
    left: 12,
    fontFamily: "Comfortaa",
    fontSize: 15,
  },
  switch: {
    bottom: 35,
    right: 15,
  },
});
