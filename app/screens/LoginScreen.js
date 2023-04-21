import * as React from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../StyleSheet";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
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
  const [userID, setUserID] = useState("");
  const [enteredEmail, setEmail] = useState("");
  const [enteredPass, setPass] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [storedEmail, setStoredEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputErrPass, setInputErrPass] = useState(false);
  const [inputErrEmail, setInputErrEmail] = useState(false);
  const [validCredentials, setValidCredentials] = useState(true);
  const [inputStylePass, setInputStylePass] = useState(styles.input);
  const [inputStyleEmail, setInputStyleEmail] = useState(styles.input);

  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  async function setLogin() {
    const data = await AsyncStorage.getItem("stayLoggedIn");
    const data2 = await AsyncStorage.getItem("storedEmail");
    setIsLoggedIn(data);
    setStoredEmail(data2);
    setPlaceholderPass("placeholder");
  }

  async function resetErrors() {
    if (!validCredentials) {
      setValidCredentials(true);
      setInputStyleEmail(styles.input);
      setInputStylePass(styles.input);
    }
  }

  async function checkID() {
    if (userID === "" && enteredEmail != "" && enteredPass != "") {
      console.log("wrong email or password");
      setInputStyleEmail(styles.inputError);
      setInputStylePass(styles.inputError);
      setValidCredentials(false);
    }
  }

  // Get the beekeeper id that matches entered email and pass to verify login
  async function attemptLogin() {
    //reset errors
    resetErrors();

    //if user logged in, fetch their ID fom async storage and let hem go to the home screen
    if (isLoggedIn) {
      const id = await AsyncStorage.getItem("bk_id");
      setUserID(parseInt(id, 10));

      //navigate if already logged in
      navigation.replace("HomeScreen", {
        screen: "HomeScreen",
        bk_id: id,
      });
    } else {
      //check if user actually put in input
      if (!enteredEmail || !enteredPass) {
        if (!enteredEmail) {
          console.log("Please enter email");
          setInputStyleEmail(styles.inputError);
          setInputErrEmail(true);
        }
        if (!enteredPass) {
          console.log("Please enter password");
          setInputStylePass(styles.inputError);
          setInputErrPass(true);
        }
        return;
      }

      //grab the user info from db, password is checked server side and then whole row is sent back, else null
      const res = await Axios.get("http://45.33.38.54:3001/bk_get", {
        params: { email: enteredEmail, pass: enteredPass },
      })
        .then((res) => {
          var id = res.data[0].bk_id;

          if (id != null) {
            console.log("credentials matched");

            //stay logged in functionality
            AsyncStorage.setItem("stayLoggedIn", JSON.stringify(true));
            AsyncStorage.setItem("storedEmail", JSON.stringify(enteredEmail));
            AsyncStorage.setItem("bk_id", JSON.stringify(id));
            setUserID(id);

            navigation.replace("HomeScreen", {
              screen: "HomeScreen",
              bk_id: id,
            });
          } else {
            console.log("wrong email or password");
          }
        })
        .catch(function (error) {
          if (error) console.log(error);
        });
      return res;
    }
  }

  useEffect(() => {
    setLogin();
  });

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
              {isLoggedIn ? (
                //if user is logged in just show email container
                <View>
                  <Text style={styles.textRegular}>email</Text>

                  {/*email input*/}
                  <TextInput
                    style={styles.input}
                    label="email"
                    placeholder={storedEmail}
                    required
                    type="text"
                    name="email"
                    onChangeText={(enteredEmail) => {
                      setEmail(enteredEmail);
                    }}
                  />
                </View>
              ) : (
                <View>
                  <Text style={styles.textRegular}>email</Text>

                  {inputErrEmail ? (
                    <Text style={styles.textError}>Please enter email</Text>
                  ) : (
                    <View></View>
                  )}
                  {/*email input*/}

                  <TextInput
                    style={inputStyleEmail}
                    label="email"
                    placeholder="email"
                    required
                    type="text"
                    name="email"
                    onChangeText={(enteredEmail) => {
                      setEmail(enteredEmail);
                      setInputStyleEmail(styles.input);
                      setInputErrEmail(false);
                      resetErrors();
                    }}
                  />

                  <Text style={styles.textRegular}>password</Text>
                  {inputErrPass ? (
                    <Text style={styles.textError}>Please enter password</Text>
                  ) : (
                    <View></View>
                  )}
                  {/*password input*/}
                  <View style={inputStylePass}>
                    <TextInput
                      style={{ marginRight: 25 }}
                      label="password"
                      placeholder="password"
                      required
                      secureTextEntry={hidePass}
                      type="text"
                      name="password"
                      onChangeText={(enteredPass) => {
                        setPass(enteredPass);
                        setInputStylePass(styles.input);
                        setInputErrPass(false);
                        resetErrors();
                      }}
                    />

                    <View style={styles.passContainer}>
                      {!hidePass ? (
                        //show password
                        <TouchableOpacity
                          onPress={() => {
                            setHidePass(!hidePass);
                          }}
                        >
                          <Image
                            style={styles.eyeIcon}
                            source={require("../assets/show.png")}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            setHidePass(!hidePass);
                          }}
                        >
                          <Image
                            style={styles.eyeIcon}
                            source={require("../assets/hide.png")}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  {!validCredentials ? (
                    <Text style={styles.textError}>
                      Wrong email or password
                    </Text>
                  ) : (
                    <View></View>
                  )}
                </View>
              )}

              <View style={styles.button}>
                <Button
                  color="#d92978"
                  title="Login"
                  onPress={() => {
                    attemptLogin();
                    checkID();
                  }}
                />
              </View>

              {isLoggedIn ? (
                //if logged in, don't show sign up option
                <View></View>
              ) : (
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
              )}
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
