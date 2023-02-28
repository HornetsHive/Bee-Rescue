import * as React from "react";

import { useFonts } from "expo-font";
import { useState } from "react";
import Axios from "axios";
import {
  Text,
  View,
  Switch,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";

export default function PreferencesScreen({ navigation }) {
  const switchColor = { false: "#808080", true: "#d92978" };
  const [user, setUser] = React.useState([]);
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [phone_no, setPhone] = useState("");
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
    ComfortaaBold: require("../assets/fonts/Comfortaa-Bold.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });
  const id = 0;
  const email = "email@gmail.com";

  // Get the current bk_id for correct preferences
  const fetchBeekeeper = async () => {
    const res = await Axios
      //10.0.2.2 is a general IP address for the emulator
      .get("http://10.0.2.2:3001/api/bk_get", {
        params: { email: "email@gmail.com", pass: "Password@123" },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);

        user.map((user) => {
          id = user.bk_id;
          console.log("ID = ", id);
        });
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          //Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    return res;
  };

  //send beekeeper info and update SQL table
  const updateNewUser = (e) => {
    //validate
    //axios.post
    //navigae to homescreen
  };
  const validate = () => {
    //check for errors and set them if found
  };

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={require("../assets/gradient4.png")}
        resizeMode="cover"
      >
        <View style={styles.headerTxt}>
          <Text style={styles.titleText}>Preferences</Text>
        </View>

        <ScrollView style={styles.middle}>
          <Button //This button and text is for testing!
            color="#da628c"
            title="Dummy Button"
            onPress={fetchBeekeeper}
          ></Button>
          <Text>
            {user.map((user) => {
              user.bk_id;
            })}
            testing "{user.bk_id}" or "{id}"
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                width: 200,
              }}
            >
              <Text style={styles.textRegular}>First Name</Text>
              <TextInput
                style={styles.input}
                label="fname"
                required
                //isInvalid={Boolean(errors.fname)}
                //validationMessage={errors.fname ? errors.fname : null}
                type="text"
                onChangeText={(fname) => {
                  setFName(fname);
                  //setErrors({ ...errors, fname: "" });
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                width: 200,
              }}
            >
              <Text style={styles.textRegular}>Last Name</Text>
              <TextInput
                style={styles.input}
                label="lname"
                required
                //isInvalid={Boolean(errors.lname)}
                //validationMessage={errors.lname ? errors.lname : null}
                type="text"
                onChangeText={(lname) => {
                  setLName(lname);
                  //setErrors({ ...errors, lname: "" });
                }}
              />
            </View>
          </View>

          <Text style={styles.textRegular}>Phone Number</Text>
          <TextInput
            style={styles.input}
            label="phone_no"
            required
            //isInvalid={Boolean(errors.phone_no)}
            //validationMessage={errors.phone_no ? errors.phone_no : null}
            type="text"
            placeholder="(XXX) XXX - XXXX"
            onChangeText={(phone_no) => {
              setPhone(phone_no);
              //setErrors({ ...errors, phone_no: "" });
            }}
          />
          <Text style={styles.textRegular}>Address</Text>
          <TextInput
            style={styles.input}
            label="address"
            required
            //isInvalid={Boolean(errors.address)}
            //validationMessage={errors.address ? errors.address : null}
            type="text"
            placeholder="(e.g., 9876 MapleWood Dr.)"
            onChangeText={(address) => {
              setAddress(address);
              //setErrors({ ...errors, address: "" });
            }}
          />
          <Text style={styles.textRegular}>City</Text>
          <TextInput
            style={styles.input}
            label="city"
            required
            //isInvalid={Boolean(errors.city)}
            //validationMessage={errors.city ? errors.city : null}
            type="text"
            placeholder="(e.g., Beesvile)"
            onChangeText={(city) => {
              setCity(city);
              //setErrors({ ...errors, city: "" });
            }}
          />
          <Text style={styles.textRegular}>Zip Code</Text>
          <TextInput
            style={styles.input}
            label="zip"
            required
            //isInvalid={Boolean(errors.zip)}
            //validationMessage={errors.zip ? errors.zip : null}
            type="text"
            placeholder="(e.g., 12345)"
            onChangeText={(zip) => {
              setZip(zip);
              //setErrors({ ...errors, zip: "" });
            }}
          />

          <View style={styles.divider}>{/*****************************/}</View>

          <Text style={styles.textRegular}>
            Please indicate the locations you are skilled at gathering swarm
            clusters.
          </Text>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Ground Swarms</Text>
            <View style={styles.switch}>
              <Switch
                value={ability1}
                trackColor={switchColor}
                thumbColor={ability1 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setAbility1(!ability1)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Valve Box/Water Main</Text>
            <View style={styles.switch}>
              <Switch
                value={ability2}
                trackColor={switchColor}
                thumbColor={ability2 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setAbility2(!ability2)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Shrubs</Text>
            <View style={styles.switch}>
              <Switch
                value={ability3}
                trackColor={switchColor}
                thumbColor={ability3 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setAbility3(!ability3)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Low Tree (Up to 10 feet)</Text>
            <View style={styles.switch}>
              <Switch
                value={ability4}
                trackColor={switchColor}
                thumbColor={ability4 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setAbility4(!ability4)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Mid Size Tree (Up to 20 feet)</Text>
            <View style={styles.switch}>
              <Switch
                value={ability5}
                trackColor={switchColor}
                thumbColor={ability5 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setAbility5(!ability5)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Tall Tree (Over 20 feet)</Text>
            <View style={styles.switch}>
              <Switch
                value={ability6}
                trackColor={switchColor}
                thumbColor={ability6 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setAbility6(!ability6)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Fences</Text>
            <View style={styles.switch}>
              <Switch
                value={ability7}
                trackColor={switchColor}
                thumbColor={ability7 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setAbility7(!ability7)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Low Structure (Up to 10 feet)</Text>
            <View style={styles.switch}>
              <Switch
                value={ability8}
                trackColor={switchColor}
                thumbColor={ability8 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setAbility8(!ability8)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>
              Medium Tall Structure (up to 20 feet)
            </Text>
            <View style={styles.switch}>
              <Switch
                value={ability9}
                trackColor={switchColor}
                thumbColor={ability9 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setAbility9(!ability9)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Chimney</Text>
            <View style={styles.switch}>
              <Switch
                value={ability10}
                trackColor={switchColor}
                thumbColor={ability10 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setAbility10(!ability10)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>
              Interior (House, Shed, Garage, etc.)
            </Text>
            <View style={styles.switch}>
              <Switch
                value={ability11}
                trackColor={switchColor}
                thumbColor={ability11 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setAbility11(!ability11)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Cut Out/Trap Out</Text>
            <View style={styles.switch}>
              <Switch
                value={ability12}
                trackColor={switchColor}
                thumbColor={ability12 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setAbility12(!ability12)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Traffic Accidents</Text>
            <View style={styles.switch}>
              <Switch
                value={ability13}
                trackColor={switchColor}
                thumbColor={ability13 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setAbility13(!ability13)}
              ></Switch>
            </View>
          </View>

          <View style={styles.divider}>{/*****************************/}</View>

          <Text style={styles.textRegular}>
            What special equipment do you have at your disposal to gather swarm
            clusters?
          </Text>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Bucket with pole</Text>
            <View style={styles.switch}>
              <Switch
                value={equipment1}
                trackColor={switchColor}
                thumbColor={equipment1 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setEquip1(!equipment1)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Ladders</Text>
            <View style={styles.switch}>
              <Switch
                value={equipment2}
                trackColor={switchColor}
                thumbColor={equipment2 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setEquip2(!equipment2)}
              ></Switch>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.textSmall}>Mechanical Lift</Text>
            <View style={styles.switch}>
              <Switch
                value={equipment3}
                trackColor={switchColor}
                thumbColor={equipment3 ? "#FFFFFF" : "#f4f3f4"}
                onValueChange={() => setEquip3(!equipment3)}
              ></Switch>
            </View>
          </View>

          <View style={styles.divider}>{/*****************************/}</View>

          <Text style={styles.textRegular}>
            What is your max swarm height preference?
          </Text>
          <TextInput
            style={styles.input}
            label="maxHeight"
            required
            //isInvalid={Boolean(errors.maxHeight)}
            //validationMessage={errors.maxHeight ? errors.maxHeight : null}
            type="text"
            placeholder="e.g., 12in, 2ft"
            onChangeText={(maxHeight) => {
              setMaxHeight(maxHeight);
              //setErrors({ ...errors, maxHeight: "" });
            }}
          />

          <View style={styles.divider}>{/*****************************/}</View>

          <Text style={styles.textRegular}>
            Are you willing to work with other beekeepers?
          </Text>
          <View style={styles.row}>
            {cooperative ? (
              <View>
                <Text style={styles.textSmall}>Yes</Text>
              </View>
            ) : (
              <Text style={styles.textSmall}>No</Text>
            )}
            <View style={styles.switch}>
              <Switch
                value={cooperative}
                trackColor={switchColor}
                thumbColor={cooperative ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={() => setCoop(!cooperative)}
              ></Switch>
            </View>
          </View>

          <View style={styles.divider}>{/*****************************/}</View>

          <View style={styles.saveButton}>
            <Button
              color="#da628c"
              title="Save Changes & Continue"
              onPress={() =>
                navigation.navigate("HomeScreen", { screen: "HomeScreen" })
              }
            ></Button>
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
  headerTxt: {
    flex: 0.1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginBottom: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  middle: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
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
    paddingVertical: 5,
    textAlign: "center",
    fontFamily: "ComfortaaBold",
  },
  textSmall: {
    fontSize: 16,
    fontFamily: "Comfortaa",
  },
  input: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    height: 50,
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
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  assetButton: {
    resizeMode: "contain",
    height: 30,
    width: 30,
  },
  divider: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginVertical: 20,
  },
});
