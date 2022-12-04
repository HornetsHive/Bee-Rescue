import * as React from "react";
import { useFonts } from "expo-font";
import { useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  SafeAreaView,
  TextInput,
  ScrollView,
  Switch,
  TouchableOpacity,
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
        <Text style={styles.titleText}>Preferences</Text>
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

      <ScrollView style={styles.middle}>
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
        <Text style={styles.textRegular}>
          * Please indicate the locations you are skilled at gathering swarm
          clusters:
        </Text>
        <View style={styles.textRegular}>
          <Text>Ground swarms</Text>
          <Text>Valve Box / Water Main</Text>
          <Text>Shrubs</Text>
          <Text>Low Tree (Up to 10')</Text>
          <Text>Mid Size Tree (Up to 20')</Text>
          <Text>Tall Tree (Over 20')</Text>
          <Text>Fences</Text>
          <Text>Low Structure (up to 10')</Text>
          <Text>Medium tall structure (up to 20')</Text>
          <Text>Chimney</Text>
          <Text>Interior (Office, House, Shed, Garage, etc)</Text>
          <Text>Cut out/trap Out</Text>
          <Text>Traffic Accidents</Text>
        </View>
        <Text style={styles.textRegular}>
          * Check which special equipment do you have at your disposal to gather
          swarm clusters?
        </Text>
        <View style={styles.textRegular}>
          <Text>Bucket with pole</Text>
          <Text>Ladders up to ____ feet </Text>
          <Text>Mechanical Lift</Text>
          <Text>None of the above</Text>
        </View>

        <Text style={styles.textRegular}>* Max swarm height preference</Text>
        <TextInput style={styles.input} placeholder="e.g., 12in, 2ft" />
        <Text style={styles.textRegular}>
          * Willing to work with other beekeepers?
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          {isEnabled ? (
            <View>
              <Text>Yes</Text>
            </View>
          ) : (
            <Text>No</Text>
          )}
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#d92978" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
  },
  header: {
    flex: 0.1,
    position: "absolute",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    width: "100%",
  },
  middle: {
    flex: 1,
    top: 80,
    width: "100%",
    alignSelf: "center",
  },
  titleText: {
    fontSize: 40,
    fontFamily: "Comfortaa",
  },
  text: {
    paddingTop: "5%",
    fontSize: 22,
    fontFamily: "Comfortaa",
  },
  textRegular: {
    fontSize: 18,
    paddingLeft: 15,
    paddingBottom: 10,
    fontFamily: "Comfortaa",
  },
  input: {
    height: 50,
    left: 10,
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
    bottom: "2%",
    right: "5%",
  },
});
