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
  StatusBar
} from "react-native";
import HomeButtonFooter from "../components/HomeButtonFooter";
import AccountHeader from "../components/AccountHeader";

export default function ReportInfoScreen({ route, navigation }) {
  const { report } = route.params

  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const claimReport = () => {
    Axios.post("http://10.0.2.2:3001/api/claim_report", {
      r_id: report.r_id,
      //Hardcoded to BB
      bk_id: 1,
    })
      .then(function (response) {
        console.log(response.data);
        navigation.navigate("HomeScreen", { screen: "HomeScreen" })
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AccountHeader nav={navigation} titleText="Report Info" />
      </View>

      <View style={styles.body}>
        <ScrollView>
          <View style={{ height: 57, top: 10, bottom: 100 }}>
            <TouchableOpacity
              style={{
                padding: 8,
                margin: 10,
                borderRadius: 10,
                backgroundColor: "#d3e954",
              }}
              onPress={() => claimReport()} // change this to actually claim a report
            >
              <Text style={{ textAlign: "center", fontFamily: "Comfortaa" }}>
                Claim Report
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
                General Area{/*Address*/}
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
                { report.city + ": " + report.zip /*report.address*/ }
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
                { report.duration } days
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
                { report.location }
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
                { report.height }
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
                { report.size }
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
    flex: 1,
    //alignSelf: "center",
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
