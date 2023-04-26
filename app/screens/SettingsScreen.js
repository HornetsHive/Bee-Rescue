import * as React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeButtonFooter from "../components/HomeButtonFooter";
import AccountHeader from "../components/AccountHeader";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import {
  Text,
  View,
  Button,
  Switch,
  StatusBar,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function SettingsScreen({ route, navigation }) {
  const userID = route.params.bk_id;
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

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
        <AccountHeader nav={navigation} titleText="Settings" />
      </View>

      <View style={styles.middle}>
        <ScrollView>
          <Text style={styles.subTitle}>Security</Text>
          <View style={{ alignItems: "center" }}></View>

          <View style={{ marginTop: 15 }}>
            <Button
              title="Reset Password"
              color="#d92978"
              onPress={() =>
                navigation.navigate("ForgotPassScreen", {
                  screen: "ForgotPassScreen",
                })
              }
            />
          </View>

          <View style={styles.divider}>{/*****************************/}</View>

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
    flex: 1,
  },
  middle: {
    flex: 8,
    width: "100%",
    paddingHorizontal: 20,
    alignSelf: "center",
    borderTopWidth: 1,
    borderColor: "gray",
  },
  inputLabel: {
    flex: 4,
    textAlign: "center",
    backgroundColor: "#d92978",
    borderRadius: 10,
    margin: "1%",
    padding: "1%",
    color: "white",
    paddingVertical: "2%",
    fontFamily: "Comfortaa",
  },
  divider: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginVertical: 20,
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
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 5,
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
