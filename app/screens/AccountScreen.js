import * as ImagePicker from "expo-image-picker";
import { useFonts } from "expo-font";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import {
  Text,
  View,
  Image,
  Switch,
  Button,
  TextInput,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import HomeButtonFooter from "../components/HomeButtonFooter";
import AccountHeader from "../components/AccountHeader"

export default function AccountScreen({ route, navigation }) {
  const userID = route.params.bk_id;

  const [image, setImage] = useState("default");
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
    // Send new data to the database from here?
    console.log("changes saved");
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AccountHeader nav={navigation} titleText="Account"/>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <KeyboardAwareScrollView>
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
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              onChangeText={setName}
            ></TextInput>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Location"
              onChangeText={setLocation}
            ></TextInput>
          </View>
          <Text style={styles.smallText}>
            Note that the swarm notifications you receive are determined by this
            location entered.
          </Text>
          <Text style={styles.bigText}>Preferences</Text>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Max Swarm Height</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="(e.g. 6 ft)"
              onChangeText={setMaxHeight}
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
              onValueChange={() => setCoop(!cooperative)}
            ></Switch>
          </View>
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
              onValueChange={() => setAbility1(!ability1)}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Valve Box/Water Main</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability2 ? "#FFFFFF" : "#f4f3f4"}
              value={ability2}
              onValueChange={() => setAbility2(!ability2)}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Shrubs</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability3 ? "#FFFFFF" : "#f4f3f4"}
              value={ability3}
              onValueChange={() => setAbility3(!ability3)}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Low Tree (Up to 10 feet)</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability4 ? "#FFFFFF" : "#f4f3f4"}
              value={ability4}
              onValueChange={() => setAbility4(!ability4)}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Mid Size Tree (Up to 20 feet)</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability5 ? "#FFFFFF" : "#f4f3f4"}
              value={ability5}
              onValueChange={() => setAbility5(!ability5)}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Tall Tree (Over 20 feet)</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability6 ? "#FFFFFF" : "#f4f3f4"}
              value={ability6}
              onValueChange={() => setAbility6(!ability6)}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Fences</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability7 ? "#FFFFFF" : "#f4f3f4"}
              value={ability7}
              onValueChange={() => setAbility7(!ability7)}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Low Structure (Up to 10 feet)</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability8 ? "#FFFFFF" : "#f4f3f4"}
              value={ability8}
              onValueChange={() => setAbility8(!ability8)}
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
              onValueChange={() => setAbility9(!ability9)}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Chimney</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability10 ? "#FFFFFF" : "#f4f3f4"}
              value={ability10}
              onValueChange={() => setAbility10(!ability10)}
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
              onValueChange={() => setAbility11(!ability11)}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Cut Out/Trap Out</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability12 ? "#FFFFFF" : "#f4f3f4"}
              value={ability12}
              onValueChange={() => setAbility12(!ability12)}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Traffic Accidents</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={ability13 ? "#FFFFFF" : "#f4f3f4"}
              value={ability13}
              onValueChange={() => setAbility13(!ability13)}
            ></Switch>
          </View>
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
              onValueChange={() => setEquip1(!equipment1)}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Ladders</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={equipment2 ? "#FFFFFF" : "#f4f3f4"}
              value={equipment2}
              onValueChange={() => setEquip2(!equipment2)}
            ></Switch>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.switchLabel}>Mechanical Lift</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#808080", true: "#d92978" }}
              thumbColor={equipment3 ? "#FFFFFF" : "#f4f3f4"}
              value={equipment3}
              onValueChange={() => setEquip3(!equipment3)}
            ></Switch>
          </View>

          <Text style={styles.bigText}>Availability</Text>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Monday</Text>
            <TextInput
              style={styles.input}
              placeholder="(e.g. 9am-3pm)"
              onChangeText={setMon}
            ></TextInput>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Tuesday</Text>
            <TextInput
              style={styles.input}
              placeholder="(e.g. 9am-3pm)"
              onChangeText={setTue}
            ></TextInput>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Wednesday</Text>
            <TextInput
              style={styles.input}
              placeholder="(e.g. 9am-3pm)"
              onChangeText={setWed}
            ></TextInput>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Thursday</Text>
            <TextInput
              style={styles.input}
              placeholder="(e.g. 9am-3pm)"
              onChangeText={setThu}
            ></TextInput>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Friday</Text>
            <TextInput
              style={styles.input}
              placeholder="(e.g. 9am-3pm)"
              onChangeText={setFri}
            ></TextInput>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Saturday</Text>
            <TextInput
              style={styles.input}
              placeholder="(e.g. 9am-3pm)"
              onChangeText={setSat}
            ></TextInput>
          </View>
          <View style={styles.aligned}>
            <Text style={styles.inputLabel}>Sunday</Text>
            <TextInput
              style={styles.input}
              placeholder="(e.g. 9am-3pm)"
              onChangeText={setSun}
            ></TextInput>
          </View>
          <View style={{ margin: 5 }} />

          <Button
            color="#50C878"
            onPress={saveChanges}
            title="Save Changes"
          ></Button>
        </KeyboardAwareScrollView>        
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
    borderTopWidth: 1,
    borderTopColor: "grey",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Comfortaa",
  },
  smallText: {
    margin: "1%",
    color: "#d92978",
    fontSize: 14,
    fontFamily: "Comfortaa",
    textAlign: "center",
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
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  footer: {
    flex: 1,
  }
});
