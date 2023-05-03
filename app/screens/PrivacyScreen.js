import * as React from "react";
import HomeButtonFooter from "../components/HomeButtonFooter";
import AccountHeader from "../components/AccountHeader";
import { useFonts } from "expo-font";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function PrivacyScreen({ route, navigation }) {
  const userID = route.params.bk_id;
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
        <AccountHeader nav={navigation} titleText="Privacy" />
      </View>

      <View style={styles.middle}>
        <ScrollView>
          <View style={{ alignItems: "flex-start" }}>
            <Text style={styles.subTitle}>Privacy Policy for Beekeepers</Text>
            <Text style={styles.text}>This Privacy Policy describes how the Bee Rescue app ("App") collects and uses personal information from registered beekeepers ("Beekeepers"). By registering for the App, Beekeepers agree to the terms of this Privacy Policy.</Text>

            <Text style={styles.subTitle}>Collection of Personal Information</Text>
            <Text style={styles.text}>The App collects Beekeepers' personal information, including their name, address, email address, and phone number. This information is collected during the registration process and is necessary for the App to function properly.</Text>

            <Text style={styles.subTitle}>Use of Personal Information</Text>
            <Text style={styles.text}>The App uses Beekeepers' personal information to facilitate the map functionality of the App, which uses the Google Maps API. The App provides the Beekeepers' address to the Google Maps API to enable the interactive map feature. The App also keeps track of all claimed and completed reports for the Beekeepers.</Text>

            <Text style={styles.subTitle}>Disclosure of Personal Information</Text>
            <Text style={styles.text}>The App does not disclose Beekeepers' personal information to any third parties, except as required by law or to comply with a court order or other legal process.</Text>

            <Text style={styles.subTitle}>Data Security</Text>
            <Text style={styles.text}>The App takes the security of Beekeepers' personal information seriously and will take reasonable measures to protect personal information from unauthorized access, use, or disclosure. However, no data transmission over the internet or wireless network can be guaranteed to be 100% secure. As a result, the App cannot guarantee the security of any information transmitted through the App, and Beekeepers use the App at their own risk.</Text>

            <Text style={styles.subTitle}>Data Retention</Text>
            <Text style={styles.text}>The App will retain Beekeepers' personal information for as long as necessary to fulfill the purposes for which it was collected, unless a longer retention period is required by law.</Text>

            <Text style={styles.subTitle}>Changes to Privacy Policy</Text>
            <Text style={styles.text}>The App reserves the right to modify this Privacy Policy at any time. Beekeepers' continued use of the App following any changes to this Privacy Policy constitutes their acceptance of those changes.</Text>

            <Text style={styles.subTitle}>Contact Information</Text>
            <Text style={styles.text}>If Beekeepers have any questions or concerns about this Privacy Policy, they can contact the Sacramento Beekeeper's Association at https://sacbeekeepers.org/contact.</Text>

            <Text style={styles.text}>By registering for the App, Beekeepers acknowledge that they have read and understood the above privacy policy and consent to the collection, use, and disclosure of their personal information as described above.</Text>
          </View>
        </ScrollView>
      </View>

      {
      userID ?
      <View style={styles.footer}>
        <HomeButtonFooter nav={navigation} bk_id={userID} />
      </View>
      :
      <></>
      }
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
    textAlign: "left",
    fontFamily: "Comfortaa",
    fontSize: 20,
    marginBottom: 5,
    marginTop: 10
  },
  text: {
    padding: 5,
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
