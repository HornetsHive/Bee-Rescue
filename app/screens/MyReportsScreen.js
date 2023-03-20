import * as React from "react";

import { useFonts } from "expo-font";
import Axios from "axios";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import HomeButtonFooter from "../components/HomeButtonFooter";
import AccountHeader from "../components/AccountHeader";

export default function MyReportsScreen({ route, navigation }) {
  const { report } = route.params;
  const [claimedreports, setClaimedReports] = React.useState([]);
  const [completedreports, setCompletedReports] = React.useState([]);
  const clamReportArray = new Array();
  const compReportArray = new Array();
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loaded) {
    return null;
  }
  /*
  //fetching info from database to display
  const showClaimedReports = async () => { //what does async do and can there be more than one?
    const res = await Axios
    .get("http://10.0.2.2:3001/api/bk_claimedReports")
      .then((res) => {
        setClaimedReports(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error: ", error.message);
        }
        console.log(error.config);
      });
      return res;
  };
  var i = 0;
  claimedreports.map((reports) => {
    clamReportArray[i] = [reports.address, ", ", reports.city, " ", reports.rdate]; //not sure how this does what it does
    i++;
  });
  const showCompletedReports = async () => {
    const res = await Axios
    .get("http://10.0.2.2:3001/api/bk_completedReports")
      .then((res) => {
        setCompletedReports(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error: ", error.message);
        }
        console.log(error.config);
      });
      return res;
  };
  var j = 0;
  completedreports.map((reports_archive) => {
    compReportArray[j] = [reports_archive.address, ", ", reports_archive.city, " ", reports_archive.date]; //not sure how this does what it does
    j++;
  });
  */
  // to be used in report info screen
  const completeReport = () => {
    Axios.post("http://10.0.2.2:3001/api/complete_report", {
      r_id: report.r_id 
    })
      .then(function (response) {
        console.log(response.data);
        navigation.navigate("MyReportsHomeScreen", { screen: "MyReportsHomeScreen" })
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //*/

  // Abandon the report r_id -- right now its hardcoded to 1
  const abandonReport = () => {
    console.log("Sent POST request to abandon report.");
    Axios.post("http://10.0.2.2:3001/api/abandon_report", { 
      r_id: report.r_id }) // Dummy value for r_id
      .then(function (response) {
        // If successful, print out the server's response
        console.log(response.data);
        navigation.navigate("MyReportsHomeScreen", { screen: "MyReportsHomeScreen" })
      })
      .catch(function (error) {
        // If error, print the error
        console.log(error);
      });
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

  //-----------------this return needs rewritting to be more like home screen----------------------//
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AccountHeader nav={navigation} titleText="My Report" />
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
            onPress={() => completeReport()} // NEED TO IMPLEMENT its kinda there now
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
            onPress={() => abandonReport()} // NEED TO IMPLEMENT
          >
            <Text style={{ textAlign: "center", fontFamily: "Comfortaa" }}>
              Abandon
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
            <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>General Area{/*Address*/}</Text>
                </View>
                <View>
                  <Text style={styles.text}>{ report.city + ": " + report.zip /*report.address*/ }</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>Duration</Text>
                </View>
                <View>
                  <Text style={styles.text}>{ report.duration } days</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>Location</Text>
                </View>
                <View>
                  <Text style={styles.text}>{ convertPropertyLocation(report.location) }</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>Height</Text>
                </View>
                <View>
                  <Text style={styles.text}>{ convertHeight(report.height) }</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>Size</Text>
                </View>
                <View>
                  <Text style={styles.text}>{ convertSize(report.size) }</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>Property Type</Text>
                </View>
                <View>
                  <Text style={styles.text}>{ convertPropertyType(report.p_type) }</Text>
                </View>
            </View>
          </ScrollView>
      </View>

      <View style={styles.footer}>
        <HomeButtonFooter nav={navigation} />
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
