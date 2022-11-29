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
  TouchableOpacity,
  ImageBackground,
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
        <Text style={styles.titleText}>Settings</Text>
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

      <ScrollView>
        <View style={styles.middle}>
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
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/gradient1.png")}
          resizeMode="cover"
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HomeScreen", {
                screen: "HomeScreen",
              });
            }}
          >
            <Image
              source={require("../assets/home.png")}
              style={styles.homeButton}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
  },
  header: {
    flex: 0.2,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  middle: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  titleText: {
    fontSize: 40,
    fontFamily: "Comfortaa",
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
  homeButton: {
    width: 40,
    height: 40,
  },
  background: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 0.1,
    top: 715,
    width: "100%",
    height: 70,
    position: "absolute",
  },
});
