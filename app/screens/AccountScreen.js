import * as React from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeButtonFooter from "../components/HomeButtonFooter";
import AccountHeader from "../components/AccountHeader";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import Axios from "axios";
import {
  Text,
  View,
  Alert,
  Image,
  Switch,
  Button,
  TextInput,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function AccountScreen({ route, navigation }) {
  const userID = route.params.bk_id;
  const [edited1, setEdit1] = useState(false);
  const [edited2, setEdit2] = useState(false);

  const [image, setImage] = useState("default");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
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

  scrollToTop = () => {
    scroller.scrollTo({ x: 0, y: 0 });
  };

  //////////////////DB QUERY
  async function getUser() {
    const res = await Axios.get("http://45.33.38.54:3001/bk_getUser", {
      params: { bk_id: userID },
    })
      .then((res) => {
        var id = res.data[0].bk_id;
        //console.log(res.data[0]);
        if (id != null && id != undefined && id != "") {
          console.log("user data snatched");
          mapUserData(res.data);
        } else {
          console.log("error with request");
          return;
        }
      })
      .catch(function (error) {
        if (error) console.log(error);
      });
    return res;
  }

  function mapUserData(userData) {
    userData.map((user) => {
      setFName(user.fname);
      setLName(user.lname);
      setEmail(user.email);
      setAddress(user.address);
      setCity(user.city);
      setZip(user.zip);

      AsyncStorage.setItem("storedCity", JSON.stringify(user.city));

      /*setAbility1();
      setAbility2();
      setAbility3();
      setAbility4();
      setAbility5();
      setAbility6();
      setAbility7();
      setAbility8();
      setAbility9();
      setAbility10();
      setAbility11();
      setAbility12();
      setAbility13();
      setEquip1();
      setEquip2();
      setEquip3();*/
    });
  }
  //--------------------- update beekeeper info
  const updateNewUser = async () => {
    try {
      // Use Promise.all to wait for both posts to resolve
      await Promise.all([
        //axios.post to update beekeeper personal info
        Axios.post("http://45.33.38.54:3001/bk_update", {
          fname: fname,
          lname: lname,
          address: address,
          city: city,
          zip: zip,
          bk_id: userID,
        }),

        //axios post again to update beekeeper qualifications
        Axios.post("http://45.33.38.54:3001/bk_qualif_update", {
          ground_swarms: ability1,
          valve_or_water_main: ability2,
          shrubs: ability3,
          low_tree: ability4,
          mid_tree: ability5,
          tall_tree: ability6,
          fences: ability7,
          low_structure: ability8,
          mid_structure: ability9,
          chimney: ability10,
          interior: ability11,
          cut_or_trap_out: ability12,
          traffic_accidents: ability13,
          bucket_w_pole: equipment1,
          ladder: equipment2,
          mechanical_lift: equipment3,
          bk_id: userID,
        }),
      ]);

      Alert.alert("", "Changes Saved", [
        {
          text: "OK",
        },
      ]);
    } catch (error) {
      console.error("Error in updateNewUser: " + error);
      Alert.alert(
        error.message,
        "Something went wrong processing your request",
        [
          {
            text: "OK",
          },
        ]
      );
    }
  };
  //////////////

  function saveChanges() {
    updateNewUser();
  }

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) setImage(result.base64);
    else setImage("default");
  };

  async function editCredentials() {
    navigation.navigate("SettingsScreen", {
      screen: "SettingsScreen",
    });
  }

  async function attemptLogOut() {
    Alert.alert(
      "",
      "Do you want to log out?",
      [
        {
          text: "No",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        { text: "Yes", onPress: () => logOut() },
      ],
      { cancelable: false }
    );
  }

  function editEmail() {
    Alert.alert("", "Cannot edit email", [
      {
        text: "Ok",
        onPress: () => {
          return;
        },
      },
    ]);
  }

  async function logOut() {
    AsyncStorage.setItem("stayLoggedIn", "");
    AsyncStorage.setItem("storedEmail", "");
    AsyncStorage.setItem("storedCity", "");
    AsyncStorage.setItem("bk_id", "");
    console.log("logging out");

    navigation.navigate("LoginScreen", {
      screen: "LoginScreen",
    });
  }

  useEffect(() => {
    getUser();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AccountHeader nav={navigation} titleText="Account" />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <ScrollView
          style={styles.middle}
          ref={(scroller) => {
            this.scroller = scroller;
          }}
        >
          <Image
            source={
              image == "default"
                ? require("../assets/LoginBeePicture.png")
                : { uri: "data:image/jpeg;base64," + image }
            }
            style={styles.pfp}
          />

          <TouchableOpacity onPress={uploadImage}>
            <Text style={styles.smallText}>Edit Profile Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={editCredentials}>
            <Text style={styles.smallText}>Security/Notification Settings</Text>
          </TouchableOpacity>
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={attemptLogOut}>
              <Text style={styles.smallText}>Log Out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              value={fname}
              onChangeText={(fname) => {
                setFName(fname);
                setEdit1(true);
              }}
            ></TextInput>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lname}
              onChangeText={(lname) => {
                setLName(lname);
                setEdit1(true);
              }}
            ></TextInput>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Email</Text>
            <TouchableOpacity style={styles.input} onPress={editEmail}>
              <Text style={styles.greyText}>{email}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={(address) => {
                setAddress(address);
                setEdit1(true);
              }}
            ></TextInput>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>City</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={(city) => {
                setCity(city);
                setEdit1(true);
              }}
            ></TextInput>
            <Text style={styles.inputLabel}>Zip</Text>
            <TextInput
              style={styles.input}
              value={zip}
              onChangeText={(zip) => {
                setZip(zip);
                setEdit1(true);
              }}
            ></TextInput>
          </View>
          <Text style={styles.smallText}>
            Note that the swarm notifications you receive are determined by this
            location entered.
          </Text>
          {edited1 ? (
            <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
              <View style={styles.saveButton}>
                <Button
                  color="grey"
                  onPress={() => {
                    getUser();
                    setEdit1(false);
                  }}
                  title="Cancel"
                ></Button>
              </View>
              <View style={styles.saveButton}>
                <Button
                  color="#da628c"
                  onPress={() => {
                    saveChanges();
                    setEdit1(false);
                  }}
                  title="Save Changes"
                ></Button>
              </View>
            </View>
          ) : (
            <View></View>
          )}

          <View style={styles.divider}>{/*****************************/}</View>

          <Text style={styles.bigText}>Preferences</Text>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Max Swarm Height</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="(e.g. 6 ft)"
              onChangeText={() => {
                setMaxHeight;
                setEdit2(true);
              }}
            ></TextInput>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>
              Willing to work with other beekeepers?
            </Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={cooperative ? "#FFFFFF" : "#f4f3f4"}
              value={cooperative}
              onValueChange={() => {
                setCoop(!cooperative);
                setEdit2(true);
              }}
            ></Switch>
          </View>

          <View style={styles.divider}>{/*****************************/}</View>

          <Text style={styles.bigText}>Self-Qualifications</Text>
          <Text style={styles.smallText}>
            Locations that you are skilled at gathering swarm clusters:
          </Text>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Ground Swarms</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability1 ? "#FFFFFF" : "#f4f3f4"}
              value={ability1}
              onValueChange={() => {
                setAbility1(!ability1);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Valve Box/Water Main</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability2 ? "#FFFFFF" : "#f4f3f4"}
              value={ability2}
              onValueChange={() => {
                setAbility2(!ability2);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Shrubs</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability3 ? "#FFFFFF" : "#f4f3f4"}
              value={ability3}
              onValueChange={() => {
                setAbility3(!ability3);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Low Tree (Up to 10 feet)</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability4 ? "#FFFFFF" : "#f4f3f4"}
              value={ability4}
              onValueChange={() => {
                setAbility4(!ability4);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>
              Mid Size Tree (Up to 20 feet)
            </Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability5 ? "#FFFFFF" : "#f4f3f4"}
              value={ability5}
              onValueChange={() => {
                setAbility5(!ability5);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Tall Tree (Over 20 feet)</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability6 ? "#FFFFFF" : "#f4f3f4"}
              value={ability6}
              onValueChange={() => {
                setAbility6(!ability6);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Fences</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability7 ? "#FFFFFF" : "#f4f3f4"}
              value={ability7}
              onValueChange={() => {
                setAbility7(!ability7);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>
              Low Structure (Up to 10 feet)
            </Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability8 ? "#FFFFFF" : "#f4f3f4"}
              value={ability8}
              onValueChange={() => {
                setAbility8(!ability8);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>
              Medium Tall Structure (up to 20 feet)
            </Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability9 ? "#FFFFFF" : "#f4f3f4"}
              value={ability9}
              onValueChange={() => {
                setAbility9(!ability9);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Chimney</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability10 ? "#FFFFFF" : "#f4f3f4"}
              value={ability10}
              onValueChange={() => {
                setAbility10(!ability10);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>
              Interior (Office, House, Shed, Garage, etc)
            </Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability11 ? "#FFFFFF" : "#f4f3f4"}
              value={ability11}
              onValueChange={() => {
                setAbility11(!ability11);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Cut Out/Trap Out</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability12 ? "#FFFFFF" : "#f4f3f4"}
              value={ability12}
              onValueChange={() => {
                setAbility12(!ability12);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Traffic Accidents</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability13 ? "#FFFFFF" : "#f4f3f4"}
              value={ability13}
              onValueChange={() => {
                setAbility13(!ability13);
                setEdit2(true);
              }}
            ></Switch>
          </View>

          <View style={styles.divider}>{/*****************************/}</View>

          <Text style={styles.smallText}>
            What special equipment do you have at your disposal to gather swarm
            clusters?
          </Text>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Bucket with pole</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={equipment1 ? "#FFFFFF" : "#f4f3f4"}
              value={equipment1}
              onValueChange={() => {
                setEquip1(!equipment1);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Ladders</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={equipment2 ? "#FFFFFF" : "#f4f3f4"}
              value={equipment2}
              onValueChange={() => {
                setEquip2(!equipment2);
                setEdit2(true);
              }}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Mechanical Lift</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={equipment3 ? "#FFFFFF" : "#f4f3f4"}
              value={equipment3}
              onValueChange={() => {
                setEquip3(!equipment3);
                setEdit2(true);
              }}
            ></Switch>
          </View>

          <View style={styles.divider}>{/*****************************/}</View>

          {edited2 ? (
            <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
              <View style={styles.saveButton}>
                <Button
                  color="grey"
                  onPress={() => {
                    getUser();
                    setEdit2(false);
                    scrollToTop();
                  }}
                  title="Cancel"
                ></Button>
              </View>
              <View style={styles.saveButton}>
                <Button
                  color="#da628c"
                  onPress={() => {
                    saveChanges();
                    setEdit2(false);
                    scrollToTop();
                  }}
                  title="Save Changes"
                ></Button>
              </View>
            </View>
          ) : (
            <View></View>
          )}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <HomeButtonFooter nav={navigation} bk_id={userID} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flex: 1,
  },
  pfp: {
    margin: "1%",
    alignSelf: "center",
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "grey",
    width: 150,
    height: 150,
  },
  bigText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Comfortaa",
    marginBottom: 20,
  },
  smallText: {
    margin: "1%",
    color: "#d92978",
    fontSize: 14,
    fontFamily: "Comfortaa",
    textAlign: "center",
  },
  greyText: {
    margin: "1%",
    color: "grey",
    fontSize: 14,
    fontFamily: "Comfortaa",
    textAlign: "left",
  },
  logoutContainer: {
    flex: 1,
    alignSelf: "center",
    marginVertical: 13,
    width: "20%",
    backgroundColor: "pink",
    paddingBottom: 3,
    borderRadius: 10,
  },
  input: {
    flex: 6,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    textAlign: "left",
    fontFamily: "Comfortaa",
    margin: "1%",
    padding: "1%",
  },
  inputLabel: {
    flex: 4,
    textAlign: "center",
    backgroundColor: "#d92978",
    borderRadius: 10,
    margin: "1%",
    padding: "1%",
    color: "white",
    paddingVertical: "2%",
    fontFamily: "Comfortaa",
  },
  switchLabel: {
    flex: 2,
    textAlign: "center",
    backgroundColor: "#d92978",
    borderRadius: 10,
    margin: "1%",
    padding: "1%",
    color: "white",
    paddingVertical: "2%",
    fontFamily: "Comfortaa",
  },
  switchInput: {
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "left",
    fontFamily: "Comfortaa",
    margin: "1%",
    padding: "1%",
  },
  switch: {
    flex: 1,
  },
  aligned: {
    display: "flex",
    flexDirection: "row",
  },
  body: {
    flex: 8,
    borderTopWidth: 1,
  },
  divider: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginVertical: 20,
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  footer: {
    flex: 1,
  },
});
