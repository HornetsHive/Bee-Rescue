import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Switch,
  Button,
  ScrollView,
} from "react-native";

export default function SettingsScreen({ navigation }) {
  const [isEnabled1, setIsEnabled1] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const [shouldShow, setShouldShow] = useState(true);
  const [text, onChangeText] = React.useState("example@gmail.com");
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <ScrollView style={{ top: 60 }}>
        <Text style={styles.subTitle}>Security</Text>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
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
        </View>
        {/* password block */}
        {shouldShow ? (
          <View style={{ marginTop: 10 }}>
            <Button
              title="Reset Password"
              color="#d92978"
              onPress={() => setShouldShow(!shouldShow)}
            />
          </View>
        ) : (
          <View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                placeholder={"current password"}
              />
              <Text style={{ fontFamily: "Comfortaa", fontSize: 12 }}>
                * at least 8 chars, one number and a special character
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                placeholder={"new password"}
              />
            </View>
            <Button
              title="Save"
              color="#d92978"
              onPress={() => setShouldShow(!shouldShow)}
            />
          </View>
        )}

        <Text style={styles.subTitle}>Notifications</Text>
        <View>
          <Text style={styles.notificationText}>Swarm Reports</Text>
          <Switch
            style={styles.switch}
            name="swarmReport"
            trackColor={{ false: "#767577", true: "#d92978" }}
            thumbColor={isEnabled1 ? "#f4f3f4" : "#f4f3f4"}
            onValueChange={toggleSwitch1}
            value={isEnabled1}
          />
          <Text style={styles.notificationText}>Report Dropped</Text>
          <Switch
            style={styles.switch}
            name="reportDropped"
            trackColor={{ false: "#767577", true: "#d92978" }}
            thumbColor={isEnabled2 ? "#f4f3f4" : "#f4f3f4"}
            onValueChange={toggleSwitch2}
            value={isEnabled2}
          />
        </View>
      </ScrollView>

      <Image
        source={require("../assets/gradient1.png")}
        style={styles.footer}
      />
      <Image
        source={require("../assets/home.png")}
        style={{ flex: 0, bottom: 15, resizeMode: "contain", height: 40 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    top: 0,
    fontSize: 40,
    position: "absolute",
    fontFamily: "Comfortaa",
    alignItems: "center",
    justifyContent: "center",
  },
  subTitle: {
    textAlign: "center",
    fontFamily: "Comfortaa",
    fontSize: 20,
    margin: 15,
  },
  text: {
    fontSize: 20,
    fontFamily: "Comfortaa",
  },
  input: {
    height: 50,
    width: "90%",
    padding: 10,
    margin: 5,
    backgroundColor: "#d9d9d9",
    borderColor: "black",
  },
  passwordContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  notificationText: {
    marginRight: "45%",
    fontFamily: "Comfortaa",
    fontSize: 15,
  },
  switch: {
    bottom: 35,
  },
  footer: {
    flex: 0,
    bottom: -40,
    alignItems: "center",
    resizeMode: "cover",
    height: 70,
    width: "100%",
  },
});
