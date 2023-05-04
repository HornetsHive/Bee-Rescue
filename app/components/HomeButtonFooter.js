import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

// Footer with a home button
export default function HomeButtonFooter ({bk_id, nav}) {
  return (        
      <ImageBackground
          source={require("../assets/gradient1.png")}
          style={styles.imgBackground}
      >
          <TouchableOpacity
              onPress={() =>
              nav.navigate("HomeScreen", { screen: "HomeScreen", bk_id: bk_id })
              }
          >
              <Image
                  source={require("../assets/home.png")}
                  style={styles.img}
              />
          </TouchableOpacity>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
    imgBackground: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
    img: {
        height: 40,
        width: 40,
    }
  },
);
