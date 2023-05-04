import React from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ReportRibbon ({id, bk_id, area, date, nav}) {
return (
    <TouchableOpacity
      onPress={() => {
        nav.navigate("ReportInfoScreen", {
          screen: "ReportInfoScreen",
          r_id: id,
          bk_id: bk_id,
        });
      }}
    >
      <View style={styles.task}>
        <View style={styles.taskText}>
          <Text value={{}} style={{ fontSize: 16 }}>
            Swarm reported in {area}
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
