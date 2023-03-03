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

export default class ReportRibbon extends React.Component {
    constructor(props) {
        super(props);
    };

    render(){
        return(
            <TouchableOpacity>
                <View style={styles.task}>
                <View style={styles.taskText}>
                    <Text value={{}} style={{ fontSize: 16 }}>
                    A swarm has been reported at {this.props.location}
                    </Text>
                    <TouchableOpacity>
                    <Image
                        source={require("../assets/x.png")}
                        style={styles.xButton}
                    ></Image>
                    </TouchableOpacity>
                </View>
                <Text>{this.props.time}</Text>
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
      xButton: {
        resizeMode: "contain",
        margin: 10,
        height: 10,
        width: 10,
      },
})