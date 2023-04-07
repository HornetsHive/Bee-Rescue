import * as React from "react";

import { useFonts } from "expo-font";
import { useState } from "react";
import {
  Text,
  View,
  Image,
  Switch,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import AccountHeader from "../components/AccountHeader";
import HomeButtonFooter from "../components/HomeButtonFooter";

export default function SettingsScreen({ route, navigation }) {
  const userID = route.params.bk_id;
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  const [text, onChangeText] = React.useState("example@gmail.com");

  const [isEnabled1, setIsEnabled1] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const [shouldShow, setShouldShow] = useState(true);
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AccountHeader nav={navigation} titleText="Settings"/>
      </View>

      <View style={styles.middle}>
        <ScrollView>
          <Text style={styles.subTitle}>Security</Text>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>email:</Text>
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
        </View>

      <View style={styles.footer}>
      <HomeButtonFooter nav={navigation} bk_id={userID} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flex: 1
  },
  middle: {
    flex: 8,
    width: "100%",
    paddingHorizontal: 20,
    alignSelf: "center",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "gray",  
  },
  footer: {
    flex: 1,
  },
  titleText: {
    fontSize: 26,
    fontFamily: "Comfortaa",
  },
  subTitle: {
    textAlign: "center",
    fontFamily: "Comfortaa",
    fontSize: 20,
    marginVertical: 10,
  },
  text: {
    fontSize: 15,
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
});
