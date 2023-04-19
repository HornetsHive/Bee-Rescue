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

export default function MyReportsScreen({ route, navigation}) {
  const userID = route.params.bk_id;
  const reportID = route.params.r_id;
  const[reportData, setReportData] = useState(null);
  const[loadingData, setLoadingData] = useState(true);

  // Complete the report
  const completeReport = () => {
    console.log("Completing report.");
    Axios.post("http://45.33.38.54:3001/complete_report", {
      r_id: reportID 
    })
      .then(function (response) {
        console.log(response.data);
        navigation.navigate("MyReportsHomeScreen", { screen: "MyReportsHomeScreen", bk_id: userID })
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Abandon the report
  const abandonReport = () => {
    console.log("Abandoning report.");
    Axios.post("http://45.33.38.54:3001/abandon_report", { 
      r_id: reportID })
      .then(function (response) {
        console.log(response.data);
        navigation.navigate("MyReportsHomeScreen", { screen: "MyReportsHomeScreen", bk_id: userID })
      })
      .catch(function (error) {
        // If error, print the error
        console.log(error);
      });
  };

  // Shows an alert asking the user confirmation for completing the report
  const confirmComplete = () => {
    Alert.alert('Confirm', 'Are you sure you want to complete this report?', [
      {
        // Cancel button
        text: 'Cancel',
        onPress: () => console.log('Complete confirmation cancelled.'),
        style: 'cancel',
      },
      {
        // Claim button
        text: 'Complete', 
        onPress: () => completeReport(),
      },
    ]);
  }

    // Shows an alert asking the user confirmation for abandoning the report
    const confirmAbandon = () => {
      Alert.alert('Confirm', 'Are you sure you want to complete this report?', [
        {
          // Cancel button
          text: 'Cancel',
          onPress: () => console.log('Abandon confirmation cancelled.'),
          style: 'cancel',
        },
        {
          // Claim button
          text: 'Abandon', 
          onPress: () => reasonForAbandon(),
        },
      ]);
    }

    // Shows an alert asking the reason for abandoning
    const reasonForAbandon = () => {
      Alert.alert('Abandoning report', 'Is there a specific reason for abandoning this report?', [
        {
          // No reason
          text: 'No',
          onPress: () => abandonReport(),
          style: 'cancel',
        },
        {
          // Exterminator
          text: 'Needs exterminator', 
          onPress: () => abandonReport(),
        },
        {
          // No bees
          text: 'No bee swarm', 
          onPress: () => abandonReport(),
        },
      ]);
    }
  

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
  };

  function convertHeight(height) {
    switch(height) {
      case "low":
        return "Low: Less than 10'";
      case "med":
        return "Medium: 10' to 20'";
      case "high":
        return "High: Greater than 20'";
      default:
        return "null";
    }
  };

  function convertSize(size) {
    switch(size) {
      case "small":
        return "Small (Size of grapefruit or smaller)";
      case "med":
        return "Medium (Size of basketball or smaller)";
      case "large":
        return "Large (Larger than a basketball)";
      default:
        return "null";
    }
  };

  function convertPropertyType(propertyType) {
    switch(propertyType) {
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
  };

  useEffect(() => {
    // Get report data from server
    console.log("Getting report data for reportID: ", reportID);
    Axios.get("http://45.33.38.54:3001/report_data", {
      params: {
        r_id: reportID,
      }
    })
      .then((response) => {
        console.log("Report data from server: ", response.data);
        setReportData(response.data[0]);
        setLoadingData(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const [loadedFonts] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loadedFonts || loadingData) {
    return(
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading report data...</Text>
      </View>
    );
  };

  //-----------------this return needs rewritting to be more like home screen----------------------//
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AccountHeader nav={navigation} titleText="Claimed Report" />
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
            onPress={() => confirmComplete()}
          >
            <Text style={{ textAlign: "center", fontFamily: "Comfortaa" }}>
              Complete
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 57, top: 10, bottom: 100 }}>
          <TouchableOpacity
            style={{
              padding: 8,
              margin: 10,
              borderRadius: 10,
              backgroundColor: "#d3e954",
            }}
            onPress={() => confirmAbandon()}
          >
            <Text style={{ textAlign: "center", fontFamily: "Comfortaa" }}>
              Abandon
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
            <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>Address</Text>
                </View>
                <View>
                  <Text style={styles.text}>{reportData.address}, {reportData.city} {reportData.zip}</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>Time present</Text>
                </View>
                <View>
                  <Text style={styles.text}>{ reportData.duration } days</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>Location</Text>
                </View>
                <View>
                  <Text style={styles.text}>{ convertPropertyLocation(reportData.location) }</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>Height</Text>
                </View>
                <View>
                  <Text style={styles.text}>{ convertHeight(reportData.height) }</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>Size</Text>
                </View>
                <View>
                  <Text style={styles.text}>{ convertSize(reportData.size) }</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>Property Type</Text>
                </View>
                <View>
                  <Text style={styles.text}>{ convertPropertyType(reportData.p_type) }</Text>
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
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 10,
    overflow: "scroll",
  },
  footer: {
    flex: 1,
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
    flexDirection: 'column',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
  },
  details: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
    marginLeft: 15,
  },
  text: {
    paddingLeft: 15,
  },
});
