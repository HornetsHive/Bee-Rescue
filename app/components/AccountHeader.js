import React from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

// Account header component contains: menu button, a title, and a bell button
export default class AccountHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (        
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            this.props.nav.navigate("AccountScreen", {
              screen: "AccountScreen",
            });
          }}
        >
          <Image
            source={require("../assets/menuButton.png")}
            style={styles.iconButton}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{this.props.titleText}</Text>
        <TouchableOpacity
          onPress={() =>
            this.props.nav.navigate("SettingsScreen", { screen: "SettingsScreen" })
          }
        >
          <Image
            source={require("../assets/bell.png")}
            style={styles.iconButton}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
    iconButton: {
        height: 30,
        width: 30,
    }, 
    title: {
      marginHorizontal: 40,
      fontSize: 30,
      fontFamily: "Comfortaa",
    }
  },
);
