import React from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function MyReportRibbon({ r_id, bk_id, location, date, nav }) {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("Going to info: " + r_id);

        nav.navigate("ClaimedReportInfoScreen", {
          screen: "ClaimedReportInfoScreen",
          r_id: r_id,
          bk_id: bk_id,
        });
      }}
    >
      <View style={styles.task}>
        <View style={styles.taskText}>
          <Text value={{}} style={{ fontSize: 16 }}>
            Swarm at {location}
          </Text>
        </View>
        <Text>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: "white",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  taskText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
