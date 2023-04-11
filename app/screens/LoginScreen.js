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
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  // Get the beekeeper id that matches entered email and pass to verify login
  async function attemptLogin() {
    //check if user actually put in input
    if (!enteredEmail) {
      console.log("Please enter email");
      return;
    }
    if (!enteredPass) {
      console.log("Please enter pasword");
      return;
    }

    //grab the user info from db, password is checked serverside and then whole row is sent back, else null
    const res = await Axios
      //10.0.2.2 is a general IP address for the emulator
      .get("http://45.33.38.54:3001/bk_get", {
        params: { email: enteredEmail, pass: enteredPass },
      })
      .then((res) => {
        var id = res.data[0].bk_id;
        
        if(id != null){
          console.log("credentials matched");
          navigation.replace("HomeScreen", {
            screen: "HomeScreen",
            bk_id: id
          })
        }
        else{
          console.log("wrong email or password");
        }
      })
      .catch(function (error) {
        if (error) console.log(error);
      });
    return res;
  }

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
                    attemptLogin();
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
                onPress={() =>
                  navigation.navigate("ForgotPassScreen", {
                    screen: "ForgotPassScreen",
                  })
                }
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
