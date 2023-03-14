import * as React from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../StyleSheet";
import { useFonts } from "expo-font";
import { useState } from "react";
import Axios from "axios";
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [enteredEmail, setEmail] = useState("");
  const [enteredPass, setPass] = useState("");
  const [user, setUser] = React.useState([]);
  var email, pass, bk_id;
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  //login to the app
  const login = () => {
    fetchBeekeeper();

    //map email and password from database if found
    user.map((user) => {
      bk_id = user.bk_id;
      email = user.email;
      pass = user.pass;
    });

    //validate email and password by matching entry in database
    validate(email, pass);
  };

  // Get the beekeeper id that matches entered email and pass to verify login
  async function fetchBeekeeper() {
    const res = await Axios
      //10.0.2.2 is a general IP address for the emulator
      .get("http://10.0.2.2:3001/api/bk_get", {
        params: { email: enteredEmail, pass: enteredPass },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(function (error) {
        if (error) console.log(error);
      });
    return res;
  }

  //check if email and password have been entered
  const validate = (email, pass) => {
    if (!enteredEmail) {
      console.log("Please enter email");
      return;
    }
    if (!enteredPass) {
      console.log("Please enter pasword");
      return;
    }
    if (email === enteredEmail && pass === enteredPass) {
      console.log("credentials matched!");
      //navigate to homescreen and pass beekeeper ID
      navigation.navigate("HomeScreen", {
        screen: "HomeScreen",
        bk_id: bk_id,
      });
    } else {
      console.log("no match");
      return;
    }
  }; //////////////////////////////////////////////////////////////////////////

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../assets/gradient1.png")}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image
              style={styles.img}
              source={require("../assets/LoginBeePicture.png")}
              resizeMode="contain"
            />
          </View>

          <View style={styles.middle}>
            <Text style={styles.titleText}>Bee Rescue</Text>
            <Text style={styles.text}>Login</Text>

            <View style={{ width: 300 }}>
              <Text style={styles.textRegular}>email</Text>
              {/*email input*/}
              <TextInput
                style={styles.input}
                label="email"
                placeholder="email"
                required
                type="text"
                name="email"
                onChangeText={(enteredEmail) => {
                  setEmail(enteredEmail);
                }}
              />
              <Text style={styles.textRegular}>password</Text>
              {/*password input*/}
              <TextInput
                style={styles.input}
                label="password"
                placeholder="password"
                required
                secureTextEntry={true}
                type="text"
                name="password"
                onChangeText={(enteredPass) => {
                  setPass(enteredPass);
                }}
              />

              <View style={styles.button}>
                <Button
                  color="#d92978"
                  title="Login"
                  onPress={() => {
                    login();
                  }}
                />
              </View>
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={() =>
                  navigation.navigate("SignUpScreen", {
                    screen: "SignUpScreen",
                  })
                }
              >
                <Text style={styles.hyperLinkText}>New? Sign up here</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
              //onPress={() =>
              //navigation.navigate("", { screen: "" })
              //}
              >
                <Text style={styles.hyperLinkText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
              //onPress={() =>
              //navigation.navigate("", { screen: "" })
              //}
              >
                <Text style={styles.hyperLinkText}>Privacy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
