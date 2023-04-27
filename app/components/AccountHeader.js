import React from "react";
import { StyleSheet, Image, View, TouchableOpacity, Text } from "react-native";

// Account header component contains: menu button, a title, and a bell button
export default class AccountHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{this.props.titleText}</Text>
        {this.props.titleText === "Account" ? (
          <TouchableOpacity
            onPress={() =>
              this.props.nav.navigate("SettingsScreen", {
                screen: "SettingsScreen",
              })
            }
          >
            <Image
              source={require("../assets/gear.png")}
              style={styles.iconButton}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {this.props.titleText === "My Report" ? (
          <TouchableOpacity
            onPress={() =>
              this.props.nav.navigate("MyReportsHomeScreen", {
                screen: "MyReportsHomeScreen",
              })
            }
          >
            <Image
              source={require("../assets/myReportButton.png")}
              style={styles.iconButton}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {this.props.titleText === "Settings" ? (
          <TouchableOpacity
            onPress={() =>
              this.props.nav.navigate("AccountScreen", {
                screen: "AccountScreen",
              })
            }
          >
            <Image
              source={require("../assets/person.png")}
              style={styles.iconButtonSmall}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    marginTop: 25,
    margin: 20,
    height: 38,
    width: 38,
  },
  iconButtonSmall: {
    marginTop: 25,
    margin: 20,
    height: 28,
    width: 28,
  },
  title: {
    align: "left",
    marginHorizontal: 20,
    fontSize: 30,
    fontFamily: "Comfortaa",
  },
});
