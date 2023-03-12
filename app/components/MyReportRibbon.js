import React from "react";

import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default class MyReportRibbon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("Going to info: " + this.props.id);
          var thisReport = this.props.rawSQL.filter((obj) => {
            return obj.r_id === this.props.id;
          })[0];

          this.props.nav.navigate("MyReportsScreen", {
            screen: "MyReportsScreen",
            report: thisReport,
          });
        }}
      >
        <View style={styles.task}>
          <View style={styles.taskText}>
            <Text value={{}} style={{ fontSize: 16 }}>
              Swarm at {this.props.location}
            </Text>
          </View>
          <Text>{this.props.date}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: "white",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "darkgray",
  },
  taskText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});