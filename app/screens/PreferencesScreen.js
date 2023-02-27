import * as React from "react";

import { useFonts } from "expo-font";
import { useState } from "react";
import {
  Text,
  View,
  Image,
  Switch,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function PreferencesScreen({ navigation }) {
  const [name, setName] = useState();
  const [loc, setLocation] = useState();
  const [maxHeight, setMaxHeight] = useState();
  const [cooperative, setCoop] = useState(false);
  const [ability1, setAbility1] = useState(false);
  const [ability2, setAbility2] = useState(false);
  const [ability3, setAbility3] = useState(false);
  const [ability4, setAbility4] = useState(false);
  const [ability5, setAbility5] = useState(false);
  const [ability6, setAbility6] = useState(false);
  const [ability7, setAbility7] = useState(false);
  const [ability8, setAbility8] = useState(false);
  const [ability9, setAbility9] = useState(false);
  const [ability10, setAbility10] = useState(false);
  const [ability11, setAbility11] = useState(false);
  const [ability12, setAbility12] = useState(false);
  const [ability13, setAbility13] = useState(false);
  const [equipment1, setEquip1] = useState(false);
  const [equipment2, setEquip2] = useState(false);
  const [equipment3, setEquip3] = useState(false);
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loaded) {
    return null;
  }
  // Get the current bk_id for correct preferences
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={require("../assets/gradient4.png")}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AccountScreen", { screen: "AccountScreen" })
            }
          >
            <Image
              source={require("../assets/menuButton.png")}
              style={{
                resizeMode: "contain",
                height: 30,
                width: 30,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>Preferences</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SettingsScreen", {
                screen: "SettingsScreen",
              })
            }
          >
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

        <ScrollView style={styles.middle}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column", width: 200 }}>
              <Text style={styles.textRegular}>* First Name</Text>
              <TextInput style={styles.input} />
            </View>

            <View style={{ flexDirection: "column", width: 200 }}>
              <Text style={styles.textRegular}>* Last Name</Text>
              <TextInput style={styles.input} />
            </View>
          </View>
          <Text style={styles.textRegular}>* Phone Number</Text>
          <TextInput style={styles.input} placeholder="(XXX) XXX - XXXX" />
          <Text style={styles.textRegular}>* Location Zip Code</Text>
          <TextInput style={styles.input} placeholder="e.g., 12345" />
          <Text style={styles.textRegular}>
            * Please indicate the locations you are skilled at gathering swarm
            clusters:
          </Text>
          <View>
            <View style={styles.aligned}>
              <Text style={styles.textSmall}>Ground Swarms</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#808080", true: "#d92978" }}
                thumbColor={ability1 ? "#FFFFFF" : "#f4f3f4"}
                value={ability1}
                onValueChange={() => setAbility1(!ability1)}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.textSmall}>Valve Box/Water Main</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#808080", true: "#d92978" }}
                thumbColor={ability2 ? "#FFFFFF" : "#f4f3f4"}
                value={ability2}
                onValueChange={() => setAbility2(!ability2)}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.textSmall}>Shrubs</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#808080", true: "#d92978" }}
                thumbColor={ability3 ? "#FFFFFF" : "#f4f3f4"}
                value={ability3}
                onValueChange={() => setAbility3(!ability3)}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.textSmall}>Low Tree (Up to 10 feet)</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#808080", true: "#d92978" }}
                thumbColor={ability4 ? "#FFFFFF" : "#f4f3f4"}
                value={ability4}
                onValueChange={() => setAbility4(!ability4)}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.textSmall}>
                Mid Size Tree (Up to 20 feet)
              </Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#808080", true: "#d92978" }}
                thumbColor={ability5 ? "#FFFFFF" : "#f4f3f4"}
                value={ability5}
                onValueChange={() => setAbility5(!ability5)}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.textSmall}>Tall Tree (Over 20 feet)</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#808080", true: "#d92978" }}
                thumbColor={ability6 ? "#FFFFFF" : "#f4f3f4"}
                value={ability6}
                onValueChange={() => setAbility6(!ability6)}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.textSmall}>Fences</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#808080", true: "#d92978" }}
                thumbColor={ability7 ? "#FFFFFF" : "#f4f3f4"}
                value={ability7}
                onValueChange={() => setAbility7(!ability7)}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.textSmall}>
                Low Structure (Up to 10 feet)
              </Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#808080", true: "#d92978" }}
                thumbColor={ability8 ? "#FFFFFF" : "#f4f3f4"}
                value={ability8}
                onValueChange={() => setAbility8(!ability8)}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.textSmall}>
                Medium Tall Structure (up to 20 feet)
              </Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#808080", true: "#d92978" }}
                thumbColor={ability9 ? "#FFFFFF" : "#f4f3f4"}
                value={ability9}
                onValueChange={() => setAbility9(!ability9)}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.textSmall}>Chimney</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#808080", true: "#d92978" }}
                thumbColor={ability10 ? "#FFFFFF" : "#f4f3f4"}
                value={ability10}
                onValueChange={() => setAbility10(!ability10)}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.textSmall}>
                Interior (Office, House, Shed, Garage, etc)
              </Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#808080", true: "#d92978" }}
                thumbColor={ability11 ? "#FFFFFF" : "#f4f3f4"}
                value={ability11}
                onValueChange={() => setAbility11(!ability11)}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.textSmall}>Cut Out/Trap Out</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#808080", true: "#d92978" }}
                thumbColor={ability12 ? "#FFFFFF" : "#f4f3f4"}
                value={ability12}
                onValueChange={() => setAbility12(!ability12)}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.textSmall}>Traffic Accidents</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#808080", true: "#d92978" }}
                thumbColor={ability13 ? "#FFFFFF" : "#f4f3f4"}
                value={ability13}
                onValueChange={() => setAbility13(!ability13)}
              ></Switch>
            </View>
          </View>
          <Text style={styles.textRegular}>
            * Check which special equipment do you have at your disposal to
            gather swarm clusters?
          </Text>
          <View style={styles.textRegular}>
            <Text>Bucket with pole</Text>
            <Text>Ladders up to ____ feet </Text>
            <Text>Mechanical Lift</Text>
            <Text>None of the above</Text>
          </View>

          <Text style={styles.textRegular}>* Max swarm height preference</Text>
          <TextInput style={styles.input} placeholder="e.g., 12in, 2ft" />
          <Text style={styles.textRegular}>
            * Willing to work with other beekeepers?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            {cooperative ? (
              <View>
                <Text>Yes</Text>
              </View>
            ) : (
              <Text>No</Text>
            )}
            <Switch
              style={styles.switch}
              trackColor={{ false: "#767577", true: "#d92978" }}
              thumbColor={cooperative ? "#f4f3f4" : "#f4f3f4"}
              onValueChange={() => setCoop(!cooperative)}
              value={cooperative}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <Button color="#16c56b" title="Save Changes"></Button>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexDirection: "column",
  },
  header: {
    flex: 0.1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 10,
  },
  middle: {
    flex: 1,
    alignSelf: "center",
  },
  footer: {
    flex: 0.5,
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 20,
  },
  titleText: {
    fontSize: 25,
    fontFamily: "Comfortaa",
  },
  textRegular: {
    fontSize: 18,
    paddingLeft: 15,
    paddingBottom: 10,
    fontFamily: "Comfortaa",
  },
  textSmall: {
    fontSize: 16,
    fontFamily: "Comfortaa",
  },
  input: {
    height: 50,
    left: 10,
    width: "80%",
    padding: 10,
    margin: 5,
    backgroundColor: "#d9d9d9",
    borderColor: "black",
  },
  notificationText: {
    left: 12,
    fontFamily: "Comfortaa",
    fontSize: 15,
  },
  switch: {
    flex: 1,
    marginRight: 10,
  },
  aligned: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
