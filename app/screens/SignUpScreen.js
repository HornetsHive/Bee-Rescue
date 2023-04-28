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
  Alert,
} from "react-native";

function isValidEmail(email) {
  var regex =
    /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function isValidPassword(pass) {
  var strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,})/;
  return strongRegex.test(pass);
}

export default function SignUpScreen({ navigation }) {
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, confirmPass] = useState("");
  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  var emailExists = false;

  const [inputErrPass, setInputErrPass] = useState(false);
  const [inputErrPassConfirm, setInputErrPassConfirm] = useState(false);
  const [inputErrEmail, setInputErrEmail] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [existingEmail, setExistingEmail] = useState(false);
  const [validPass, setValidPass] = useState(true);
  const [validPassConfirm, setValidPassConfirm] = useState(true);
  const [inputStylePass, setInputStylePass] = useState(styles.input);
  const [inputStyleEmail, setInputStyleEmail] = useState(styles.input);
  const [inputStylePassConfirm, setInputStylePassConfirm] = useState(
    styles.input
  );
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  //submit email and password
  async function submitNewUser(e) {
    e.preventDefault();

    //validate submission
    const err = await validate();
    if (err) {
      console.log("error");
      return;
    }

    new Promise((resolve, reject) => {
      Axios.post("http://45.33.38.54:3001/bk_insert", {
        email: email,
        pass: pass,
      })
        .then(() => {
          resolve();
        })
        .catch(function (error) {
          console.log(error);
          Alert.alert(
            error.message,
            "Something went wrong processing your request",
            [
              {
                text: "OK",
              },
            ]
          );
          reject();
        });
    })
      .then(() => {
        console.log("User created!");
        //navigate to preferences page
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "PreferencesScreen",
              params: { email: email, pass: pass },
            },
          ],
        });
      })
      .catch((error) => {
        //every .then needs a .catch
        console.log(error);
      });
  }

  async function getUser() {
    await Axios.get("http://45.33.38.54:3001/bk_user", {
      params: { email: email },
    })
      .then((res) => {
        var data = res.data;
        if (data != null && data != undefined && data != "") {
          if (data[0].email == email) {
            setInputStyleEmail(styles.inputError);
            setExistingEmail(true);
            //emailExists = true;
            console.log("email is already in use");
          }
        }
      })
      .catch(function (error) {
        if (error) console.log(error);
      });
  }

  async function validate() {
    const newErrors = { ...errors };

    //check if entered email is already in use
    await getUser();
    if (existingEmail) {
      newErrors.email = "email in use";
    }

    if (!email || !pass || !passConfirm) {
      if (!email) {
        newErrors.email = "This field is required";
        console.log("Please enter email");
        setInputStyleEmail(styles.inputError);
        setInputErrEmail(true);
      }
      if (!pass) {
        newErrors.pass = "This field is required";
        console.log("Please enter password");
        setInputStylePass(styles.inputError);
        setInputErrPass(true);
      }
      if (!passConfirm) {
        console.log("Please confirm password");
        setInputStylePassConfirm(styles.inputError);
        setInputErrPassConfirm(true);
      }
    }
    if (pass != "" && !isValidPassword(pass)) {
      newErrors.pass = "Please enter a valid password";
      console.log("Please enter a valid password");
      setInputStylePass(styles.inputError);
      setValidPass(false);
    }
    if (email != "" && !isValidEmail(email)) {
      newErrors.email = "Please enter a valid email";
      console.log("Please enter a valid email");
      setInputStyleEmail(styles.inputError);
      setValidEmail(false);
    }
    if (isValidPassword(pass) && pass != passConfirm) {
      newErrors.passConfirm = "passwords don't match";
      console.log("passwords don't match");
      setInputStylePassConfirm(styles.inputError);
      setValidPassConfirm(false);
    }

    setErrors(newErrors);
    console.log(newErrors);

    return !Object.values(newErrors).every((error) => error === "");
  }

  //resets error text and error box based on the parameters passed
  async function resetErrors(errType) {
    if (errType === "email") {
      setInputStyleEmail(styles.input);
      setInputErrEmail(false);
      if (!validEmail) {
        setValidEmail(true);
      }
      if (existingEmail) {
        setExistingEmail(false);
        //emailExists = false;
      }
    }
    if (errType === "pass") {
      setInputStylePass(styles.input);
      setInputErrPass(false);
      if (!validPass) {
        setValidPass(true);
      }
      if (!validPassConfirm) {
        setValidPassConfirm(true);
        setInputStylePassConfirm(styles.input);
        setInputErrPassConfirm(false);
      }
    }
    if (errType === "passConfirm") {
      setInputStylePassConfirm(styles.input);
      setInputErrPassConfirm(false);
      if (!validPassConfirm) {
        setValidPassConfirm(true);
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////

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
            <Text style={styles.text}>Sign Up</Text>

            <View style={{ width: 300 }}>
              <Text style={styles.textRegular}>email</Text>
              {inputErrEmail ? (
                <Text style={styles.textError}>Please enter email</Text>
              ) : (
                <View></View>
              )}
              {!validEmail ? (
                <Text style={styles.textError}>Please enter a valid email</Text>
              ) : (
                <View></View>
              )}
              {existingEmail ? (
                <Text style={styles.textError}>Email is already in use</Text>
              ) : (
                <View></View>
              )}
              {/*email input*/}
              <TextInput
                style={inputStyleEmail}
                label="email"
                placeholder="email"
                required
                isInvalid={Boolean(errors.email)}
                validationMessage={errors.email ? errors.email : null}
                type="text"
                onChangeText={(email) => {
                  setEmail(email);
                  setErrors({ ...errors, email: "" });
                  resetErrors("email");
                }}
              />

              <Text style={styles.textRegular}>password</Text>
              <Text style={styles.textSmall}>
                * must have a minimum of 8 chars
              </Text>
              <Text style={styles.textSmall}>
                * must have at least one capital letter
              </Text>
              <Text style={styles.textSmall}>
                * must have at least one special character
              </Text>
              <Text style={styles.textSmall}>
                * must have at least one number
              </Text>

              {inputErrPass ? (
                <Text style={styles.textError}>Please enter password</Text>
              ) : (
                <View></View>
              )}
              {!validPass ? (
                <Text style={styles.textError}>
                  Please enter a valid password
                </Text>
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
                  secureTextEntry={hidePass1}
                  isInvalid={Boolean(errors.pass)}
                  validationMessage={errors.pass ? errors.pass : null}
                  type="text"
                  onChangeText={(pass) => {
                    setPass(pass);
                    setErrors({ ...errors, pass: "" });
                    resetErrors("pass");
                  }}
                />
                <View style={styles.passContainer}>
                  {!hidePass1 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setHidePass1(!hidePass1);
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
                        setHidePass1(!hidePass1);
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

              <Text style={styles.textRegular}>confirm password</Text>
              {inputErrPassConfirm ? (
                <Text style={styles.textError}>Please confirm password</Text>
              ) : (
                <View></View>
              )}
              {!validPassConfirm ? (
                <Text style={styles.textError}>Passwords do not match</Text>
              ) : (
                <View></View>
              )}
              {/*confirm password input*/}
              <View style={inputStylePassConfirm}>
                <TextInput
                  style={{ marginRight: 25 }}
                  label="confirmPassword"
                  placeholder="password"
                  required
                  secureTextEntry={hidePass2}
                  type="text"
                  onChangeText={(passConfirm) => {
                    confirmPass(passConfirm);
                    setErrors({ ...errors, passConfirm: "" });
                    resetErrors("passConfirm");
                  }}
                />
                <View style={styles.passContainer}>
                  {!hidePass2 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setHidePass2(!hidePass2);
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
                        setHidePass2(!hidePass2);
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

              <View
                style={{
                  height: 50,
                  marginHorizontal: 10,
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                <Button
                  color="#d92978"
                  title="Sign Up"
                  onPress={submitNewUser}
                />
              </View>

              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  marginTop: 0,
                  marginBottom: 20,
                  padding: 0,
                }}
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "LoginScreen" }],
                  })
                }
              >
                <Text style={styles.hyperLinkText}>Return to login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
