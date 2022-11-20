import * as React from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const onPress = () => {};
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require("../assets/menuButton.png")}
            style={{
              resizeMode: "contain",
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontFamily: "Comfortaa", fontSize: 15, width: 180 }}>
          Location: Orangevale
        </Text>
        <TouchableOpacity>
          <Image
            source={require("../assets/bell.png")}
            style={{
              resizeMode: "contain",
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.middle}>
        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.textBox}>Change location</Text>
        </TouchableOpacity>

        <Image
          source={require("../assets/map.png")}
          style={{
            alignSelf: "center",
            resizeMode: "contain",
            height: 180,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity>
            <Image
              source={require("../assets/sort.png")}
              style={{
                resizeMode: "contain",
                margin: 10,
                height: 30,
                width: 30,
              }}
            ></Image>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.textBox}>Recent Activity</Text>
          </View>
          <TouchableOpacity>
            <Image
              source={require("../assets/refresh.png")}
              style={{
                resizeMode: "contain",
                margin: 10,
                height: 30,
                width: 30,
              }}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.task}>
          <View style={styles.taskText}>
            <Text style={{ fontSize: 16 }}>
              A swarm has been reported in Orangevale
            </Text>
            <TouchableOpacity>
              <Image
                source={require("../assets/x.png")}
                style={styles.xButton}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text>Todat at 10:41am</Text>
        </View>

        <View style={styles.task}>
          <View style={styles.taskText}>
            <Text style={{ fontSize: 16 }}>
              A swarm has been reported in Orangevale
            </Text>
            <TouchableOpacity>
              <Image
                source={require("../assets/x.png")}
                style={styles.xButton}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text>Wednesday at 4:35pm</Text>
        </View>

        <View style={styles.task}>
          <View style={styles.taskText}>
            <Text style={{ fontSize: 16 }}>
              A swarm has been reported in Orangevale
            </Text>
            <TouchableOpacity>
              <Image
                source={require("../assets/x.png")}
                style={styles.xButton}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text>Tuesday at 12:03pm</Text>
        </View>

        <View style={styles.task}>
          <View style={styles.taskText}>
            <Text style={{ fontSize: 16 }}>
              A swarm has been reported in Orangevale
            </Text>
            <TouchableOpacity>
              <Image
                source={require("../assets/x.png")}
                style={styles.xButton}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text>Monday at 5:32pm</Text>
        </View>
      </View>

      <SafeAreaView>
        <Image
          source={require("../assets/gradient1.png")}
          style={styles.footer}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("HomeScreen", { screen: "HomeScreen" })
          }
        >
          <Image
            source={require("../assets/home.png")}
            style={{
              alignSelf: "center",
              bottom: 15,
              resizeMode: "contain",
              height: 40,
              width: 40,
            }}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignSelf: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.2,
    top: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "darkgray",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  middle: {
    flex: 2.5,
    justifyContent: "center",
    borderColor: "lightgray",
    borderWidth: 1,
  },
  footer: {
    flex: 0,
    bottom: -40,
    alignItems: "center",
    resizeMode: "cover",
    height: 70,
    width: "100%",
  },
  textBox: {
    textAlign: "center",
    fontFamily: "Comfortaa",
  },
  textContainer: {
    alignSelf: "center",
    padding: 8,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#d3e954",
  },
  task: {
    backgroundColor: "white",
    padding: 15,
    borderWidth: 0.5,
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
});
