import React from "react";
import * as Font from "expo-font";
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

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      image: "../assets/LoginBeePicture.png",
      name: "",
      location: "",
      workWithOthers: false,
      swarmHeight: 0,
      ability1: false,
      ability2: false,
      ability3: false,
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
      sat: "",
      sun: "",
    };
  }

  async loadFonts() {
    await Font.loadAsync({
      "rounded-sans-serif": require("../assets/fonts/rounded-sans-serif.ttf"),
      "San-seriff-ic": require("../assets/fonts/San-seriff-ic.otf"),
      Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaView style={styles.container}>
          <ImageBackground
            style={styles.background}
            source={"../assets/gradient1.png"}
            resizeMode="cover"
          >
            <Text style={styles.titleText}>Account</Text>

            <View style={{ height: "50%", width: "100%", marginLeft: "15%" }}>
              <Image style={styles.pfp} source={require(this.state.image)} />
              <View style={styles.button}>
                <input
                  id="img"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(event) => {
                    //console.log(event.target.files[0]);
                    let reader = new FileReader();
                    reader.readAsDataURL(event.target.files[0]);
                    reader.onload = function (e) {
                      var dataurl = reader.result;
                      this.setState({ image: dataurl });
                      console.log("image loaded");
                    };
                  }}
                ></input>
              </View>

              <Text style={styles.textRegular}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name"
                onChangeText={(val) => {
                  this.setState({ name: val });
                }}
              />
              <Text style={styles.textRegular}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Your Location"
                onChangeText={(val) => {
                  this.setState({ location: val });
                }}
              />

              <Text style={styles.textRegular}>Abilities</Text>
              <Text style={styles.textRegular}>Ability 1</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  this.setState({ ability1: !this.state.ability1 });
                }}
                value={this.state.ability1}
              ></Switch>

              <Text style={styles.textRegular}>Ability 2</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  this.setState({ ability2: !this.state.ability2 });
                }}
                value={this.state.ability2}
              ></Switch>

              <Text style={styles.textRegular}>Ability 3</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  this.setState({ ability3: !this.state.ability3 });
                }}
                value={this.state.ability3}
              ></Switch>

              <Text style={styles.textRegular}>Preferences</Text>

              <Text style={styles.textRegular}>
                Max swarm height preference:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="(e.g. 5 ft)"
                onChangeText={(val) => {
                  this.setState({ swarmHeight: val });
                }}
              />

              <Text style={styles.textRegular}>
                Willing to work with others?
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  this.setState({ workWithOthers: !workWithOthers });
                }}
                value={this.state.workWithOthers}
              ></Switch>

              <Text style={styles.textRegular}>Abilities</Text>

              <Text style={styles.textRegular}>Monday</Text>
              <TextInput
                style={styles.input}
                placeholder="(e.g 11am-3pm)"
                onChangeText={(val) => {
                  this.setState({ mon: val });
                }}
              />

              <Text style={styles.textRegular}>Tuesday</Text>
              <TextInput
                style={styles.input}
                placeholder="(e.g 11am-3pm)"
                onChangeText={(val) => {
                  this.setState({ tue: val });
                }}
              />

              <Text style={styles.textRegular}>Wednesday</Text>
              <TextInput
                style={styles.input}
                placeholder="(e.g 11am-3pm)"
                onChangeText={(val) => {
                  this.setState({ wed: val });
                }}
              />

              <Text style={styles.textRegular}>Thursday</Text>
              <TextInput
                style={styles.input}
                placeholder="(e.g 11am-3pm)"
                onChangeText={(val) => {
                  this.setState({ thu: val });
                }}
              />

              <Text style={styles.textRegular}>Friday</Text>
              <TextInput
                style={styles.input}
                placeholder="(e.g 11am-3pm)"
                onChangeText={(val) => {
                  this.setState({ fri: val });
                }}
              />

              <Text style={styles.textRegular}>Saturday</Text>
              <TextInput
                style={styles.input}
                placeholder="(e.g 11am-3pm)"
                onChangeText={(val) => {
                  this.setState({ sat: val });
                }}
              />

              <Text style={styles.textRegular}>Sunday</Text>
              <TextInput
                style={styles.input}
                placeholder="(e.g 11am-3pm)"
                onChangeText={(val) => {
                  this.setState({ sun: val });
                }}
              />

              <View style={styles.button}>
                <Button
                  color="#d92978"
                  title="Save Changes"
                  onPress={() => console.log("Changes saved")}
                />
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      );
    } else {
      return null;
    }
  }
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
    position: "absolute",
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
});
