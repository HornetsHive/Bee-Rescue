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

        <View style={styles.itemTall}>
          <View style={styles.label}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 17,
                fontWeight: "bold",
                bottom: 7,
              }}
            >
              Address
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.content}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 15,
                width: "80%",
                top: 7,
              }}
            >
              {report.address}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.label}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Duration
            </Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.content}>
            <Text style={{ fontFamily: "Comfortaa", fontSize: 15 }}>
              {report.duration} days
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.label}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Location
            </Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.content}>
            <Text style={{ fontFamily: "Comfortaa", fontSize: 15 }}>
              {report.location}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.label}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Height
            </Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.content}>
            <Text style={{ fontFamily: "Comfortaa", fontSize: 15 }}>
              {report.height}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.label}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Size
            </Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.content}>
            <Text style={{ fontFamily: "Comfortaa", fontSize: 15 }}>
              {report.size}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.label}>
            <Text
              style={{
                fontFamily: "Comfortaa",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Category
            </Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.content}>
            <Text style={{ fontFamily: "Comfortaa", fontSize: 15 }}>
              {report.category}
            </Text>
          </View>
        </View>
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
});
