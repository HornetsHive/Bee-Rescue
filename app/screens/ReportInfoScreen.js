import * as React from "react";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import Axios from "axios";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import HomeButtonFooter from "../components/HomeButtonFooter";
import AccountHeader from "../components/AccountHeader";
import SinglePinGoogleMap from "../components/SinglePinGoogleMap";

export default function ReportInfoScreen({ route, navigation }) {
  const userID = route.params.bk_id;
  const reportID = route.params.r_id;
  const [reportData, setReportData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  console.log("account id: " + userID);
  console.log("report id: " + reportID);

  // Sends claim_report post request to the server
  const claimReport = () => {
    console.log("Claiming report.");
    Axios.post("https://beerescue.net:3001/claim_report", {
      r_id: reportID,
      bk_id: userID,
    })
      .then(function (response) {
        console.log(response.data);
        navigation.replace("ClaimedReportInfoScreen", {
          screen: "ClaimedReportInfoScreen",
          r_id: reportID,
          bk_id: userID,
        });
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert(error.message, "Something went wrong processing your request", [{ text: "OK" }]);
      });
  };

  // Shows an alert asking the user to confirm or cancel
  const confirmClaim = () => {
    Alert.alert("Confirm", "Are you sure you want to claim this report?", [
      {
        // Cancel button
        text: "Cancel",
        onPress: () => console.log("Claim confirmation cancelled."),
        style: "cancel",
      },
      {
        // Claim button
        text: "Claim",
        onPress: () => claimReport(),
      },
    ]);
  };

  function convertPropertyLocation(propertyLocation) {
    switch (propertyLocation) {
      case "indoors":
        return "Indoors";
      case "ext_wall":
        return "Exterior structure";
      case "ext_tree":
        return "Exterior tree/plant/fixture";
      case "chimney":
        return "Chimney";
      case "infested":
        return "Inside of a wall/Other inaccessible area";
      case "ground":
        return "Ground";
      case "other":
        return "Other";
      default:
        return "null";
    }
  }

  function convertHeight(height) {
    switch (height) {
      case "low":
        return "Low: Less than 10'";
      case "med":
        return "Medium: 10' to 20'";
      case "high":
        return "High: Greater than 20'";
      default:
        return "null";
    }
  }

  function convertSize(size) {
    switch (size) {
      case "small":
        return "Small (Size of grapefruit or smaller)";
      case "med":
        return "Medium (Size of basketball or smaller)";
      case "large":
        return "Large (Larger than a basketball)";
      default:
        return "null";
    }
  }

  function convertPropertyType(propertyType) {
    switch (propertyType) {
      case "res_detached":
        return "Residential detached home";
      case "res_apartment":
        return "Residential apartment";
      case "commercial":
        return "Commercial";
      case "rural":
        return "Rural";
      default:
        return "null";
    }
  }

  useEffect(() => {
    // Get report data from server
    console.log("Getting report data...");
    Axios.get("https://beerescue.net:3001/report_data", {
      params: {
        r_id: reportID,
      },
    })
      .then((response) => {
        console.log(response.data);
        setReportData(response.data[0]);
        setLoadingData(false);
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert(error.message, "Something went wrong processing your request", [{ text: "OK" }]);
      });
  }, []);

  const [loadedFonts] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loadedFonts || loadingData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading report data...</Text>
      </View>
    );
  }

  function renderDuration() {
    if (reportData.duration != null && reportData.duration != "") {
      return (
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>Duration</Text>
          </View>
          <View>
            <Text style={styles.text}>{reportData.duration} days</Text>
          </View>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AccountHeader nav={navigation} titleText="Report Info" />
      </View>

      <View style={styles.body}>
        <View style={{ height: 57, top: 10, bottom: 100 }}>
          <TouchableOpacity
            style={{
              padding: 8,
              margin: 10,
              borderRadius: 10,
              backgroundColor: "#d3e954",
            }}
            onPress={() => confirmClaim()}
          >
            <Text style={{ textAlign: "center", fontFamily: "Comfortaa" }}>
              Claim Report
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mapContainer}>
          <SinglePinGoogleMap
            reportLat={reportData.lat} 
            reportLong={reportData.lng}
          />
        </View>

        <ScrollView>
          <View style={styles.row}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>General Area{/*Address*/}</Text>
            </View>
            <View>
              <Text style={styles.text}>
                {reportData.city + ": " + reportData.zip /*report.address*/}
              </Text>
            </View>
          </View>

          {renderDuration()}

          <View style={styles.row}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>Location</Text>
            </View>
            <View>
              <Text style={styles.text}>
                {convertPropertyLocation(reportData.location)}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>Height</Text>
            </View>
            <View>
              <Text style={styles.text}>
                {convertHeight(reportData.height)}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>Size</Text>
            </View>
            <View>
              <Text style={styles.text}>{convertSize(reportData.size)}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>Property Type</Text>
            </View>
            <View>
              <Text style={styles.text}>
                {convertPropertyType(reportData.p_type)}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <HomeButtonFooter nav={navigation} bk_id={userID} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignSelf: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mapContainer: {
    flex: 8,
    borderColor: "gray",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "darkgray",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  body: {
    flex: 8,
    borderColor: "gray",
    borderTopWidth: 1,
  },
  footer: {
    alignSelf: "center",
    width: "45%",
    borderColor: "black",
    borderWidth: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    flex: 0.6,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    height: 55,
  },
  itemTall: {
    flexDirection: "row",
    height: 105,
    top: 25,
  },
  label: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  divider: {
    width: 2,
    top: 12,
    height: "50%",
    margin: 6,
    backgroundColor: "darkgray",
  },
  content: {
    flex: 0,
    padding: 15,
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "column",
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 15,
  },
  details: {
    fontWeight: "400",
    color: "#666",
    fontSize: 12,
    marginLeft: 15,
  },
  text: {
    paddingLeft: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
    color: "#333",
  },
});
