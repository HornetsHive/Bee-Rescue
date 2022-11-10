import * as React from "react";
import { useFonts } from "expo-font";
import { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  Alert,
  Button,
  Image,
  SafeAreaView,
  TextInput,
  Switch,
} from "react-native";

export default function AccountScreen() {
  const [profilePic, setProfilePic] = useState();
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [cooperative, setCooperative] = useState(false);
  const [swarmHeight, setSwarmHeight] = useState();
  const [ability1, setAbility1] = useState(false);
  const [ability2, setAbility2] = useState(false);
  const [ability3, setAbility3] = useState(false);
  const [mon, setMon] = useState();
  const [tue, setTue] = useState();
  const [wed, setWed] = useState();
  const [thu, setThu] = useState();
  const [fri, setFri] = useState();
  const [sat, setSat] = useState();
  const [sun, setSun] = useState();
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  if (!loaded) {
    return null;
  }

  function saveChanges() {
    console.log("name: ", name);
    console.log("location: ", location);
    console.log("swarm height: ", swarmHeight);
    console.log("abilities 1,2,3: ", ability1, ability2, ability3);
    console.log("availability: ", mon, tue, wed, thu, fri, sat, sun);
    //console.log("img", profilePic);
    console.log("changes saved");
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.titleText}>Account</Text>
        <View>
          <Image style={styles.pfp} source={profilePic} />
          <Text style={styles.headerText}>Edit Profile Picture: </Text>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(event) => {
              console.log(event.target.files[0]);
              let reader = new FileReader();
              reader.readAsDataURL(event.target.files[0]);
              reader.onload = function (e) {
                var dataurl = reader.result;
                setProfilePic(dataurl);
                console.log("image loaded");
              };
            }}
          ></input>
        </View>
        <Text>Name</Text>
        <TextInput placeholder="Your Name" onChangeText={setName}></TextInput>
        <Text>Location</Text>
        <TextInput
          placeholder="Your Location"
          onChangeText={setLocation}
        ></TextInput>
        <Text>
          Note: Swarm notifications you receive are based on this location
        </Text>
        <Text>Preferences</Text>
        <Text>Max Swarm Height Preference:</Text>
        <TextInput
          placeholder="e.g. 6 ft"
          onChangeText={setSwarmHeight}
        ></TextInput>
        <Text>Willing to work with other beekeepers?</Text>
        <Switch
          value={cooperative}
          onValueChange={() => {
            setCooperative(!cooperative);
          }}
        ></Switch>
        <Text>Ability 1</Text>
        <Switch
          value={ability1}
          onValueChange={() => {
            setAbility1(!ability1);
          }}
        ></Switch>
        <Text>Ability 2</Text>
        <Switch
          value={ability2}
          onValueChange={() => {
            setAbility2(!ability2);
          }}
        ></Switch>
        <Text>Ability 3</Text>
        <Switch
          value={ability3}
          onValueChange={() => {
            setAbility3(!ability3);
          }}
        ></Switch>
        <Text>Availability</Text>
        <Text style={styles.textRegular}>Monday</Text>
        <TextInput placeholder="e.g. 9am-3pm" onChangeText={setMon}></TextInput>
        <Text style={styles.textRegular}>Tuesday</Text>
        <TextInput placeholder="e.g. 9am-3pm" onChangeText={setTue}></TextInput>
        <Text style={styles.textRegular}>Wednesday</Text>
        <TextInput placeholder="e.g. 9am-3pm" onChangeText={setWed}></TextInput>
        <Text style={styles.textRegular}>Thursday</Text>
        <TextInput placeholder="e.g. 9am-3pm" onChangeText={setThu}></TextInput>
        <Text style={styles.textRegular}>Friday</Text>
        <TextInput placeholder="e.g. 9am-3pm" onChangeText={setFri}></TextInput>
        <Text style={styles.textRegular}>Saturday</Text>
        <TextInput placeholder="e.g. 9am-3pm" onChangeText={setSat}></TextInput>
        <Text style={styles.textRegular}>Sunday</Text>
        <TextInput placeholder="e.g. 9am-3pm" onChangeText={setSun}></TextInput>
        <View style={styles.button}>
          <Button onPress={saveChanges} title="Save Changes"></Button>
        </View>
        <SafeAreaView style={styles.footer}>
          <Image
            source={require("../assets/home.png")}
            style={{
              resizeMode: "contain",
              height: 40,
            }}
          />
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    position: "absolute",
    height: "25%",
    width: "100%",
    top: "2%",
    margin: 10,
  },
  titleText: {
    alignItems: "center",
    height: "69%",
    fontSize: 50,
    fontFamily: "rounded-sans-serif",
  },
  text: {
    position: "absolute",
    alignItems: "center",
    height: "63%",
    paddingTop: "5%",
    fontSize: 20,
    fontFamily: "Comfortaa",
  },
  textRegular: {
    fontSize: 15,
    paddingLeft: 10,
    fontFamily: "Comfortaa",
  },
  input: {
    height: 50,
    width: "80%",
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderColor: "white",
  },
  button: {
    height: 50,
    width: "80%",
    margin: 10,
  },
  pfp: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  headerText: {
    fontSize: 25,
    paddingLeft: 10,
    fontFamily: "Comfortaa",
  },
});
