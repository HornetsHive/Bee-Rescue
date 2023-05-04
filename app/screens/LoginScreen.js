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
  Alert,
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
    const ID = await AsyncStorage.getItem("bk_id");
    setUserID(parseInt(ID, 10));
    setIsLoggedIn(data);
    setStoredEmail(data2);
    if (isLoggedIn) {
      console.log("logged in");
    }
  }

  // Get the beekeeper id that matches entered email and pass to verify login
  async function attemptLogin() {
    console.log("attempting login");
    //reset errors
    resetErrors();

    //if user logged in, fetch their ID fom async storage and let hem go to the home screen
    if (isLoggedIn) {
      //navigate if already logged in
      navigation.replace("HomeScreen", {
        screen: "HomeScreen",
        bk_id: userID,
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
      const res = await Axios.get("https://beerescue.net:3001/bk_get", {
        params: { email: enteredEmail, pass: enteredPass },
      })
        .then((res) => {
          var id = res.data[0].bk_id;

          if (id != null && id != undefined && id != "") {
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
          Alert.alert(
            error.message,
            "Something went wrong processing your request",
            [{ text: "OK" }]
          );
        });
      return res;
    }
  }

  //resets error text and error box based on the parameters passed
  async function resetErrors(errType) {
    if (errType === "email") {
      setInputStyleEmail(styles.input);
      setInputErrEmail(false);
      if (!validCredentials) {
        setValidCredentials(true);
        setInputStyleEmail(styles.input);
        setInputStylePass(styles.input);
      }
    }
    if (errType === "pass") {
      setInputStylePass(styles.input);
      setInputErrPass(false);
      if (!validCredentials) {
        setValidCredentials(true);
        setInputStyleEmail(styles.input);
        setInputStylePass(styles.input);
      }
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

  useEffect(() => {
    setLogin();
    try {
      if (isLoggedIn) {
        //navigate if already logged in
        navigation.replace("HomeScreen", {
          screen: "HomeScreen",
          bk_id: userID,
        });
      }
    } catch {
      return console.log("error logging in");
    }
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
                //if user not logged in
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
                      resetErrors("email");
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
                        resetErrors("pass");
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
                <TouchableOpacity onPress={() => navigation.navigate("PrivacyScreen", { screen: "PrivacyScreen"})}>
                  <Text style={styles.hyperLinkText}>Privacy</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
