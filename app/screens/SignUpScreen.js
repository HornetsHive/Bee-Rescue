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
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  //submit email and password
  const submitNewUser = (e) => {
    e.preventDefault();

    //validate submission
    const err = validate();
    if (err) {
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
  };

  const validate = () => {
    const newErrors = { ...errors };
    if (!email) {
      newErrors.email = "This field is required";
      console.log("Please enter email");
    }
    if (!pass) {
      newErrors.pass = "This field is required";
      console.log("Please enter password");
    }
    if (!isValidPassword(pass)) {
      newErrors.pass = "Please enter a valid password";
      console.log("Please enter a valid password");
    }
    if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email";
      console.log("Please enter a valid email");
    }
    if (pass != passConfirm) {
      newErrors.passConfirm = "passwords don't match";
      console.log("passwords don't match");
    }
    setErrors(newErrors);

    return !Object.values(newErrors).every((error) => error === "");
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
            <Text style={styles.text}>Sign Up</Text>

            <View style={{ width: 300 }}>
              <Text style={styles.textRegular}>email</Text>

              {/*email input*/}
              <TextInput
                style={styles.input}
                label="email"
                placeholder="email"
                required
                isInvalid={Boolean(errors.email)}
                validationMessage={errors.email ? errors.email : null}
                type="text"
                onChangeText={(email) => {
                  setEmail(email);
                  setErrors({ ...errors, email: "" });
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

              {/*password input*/}
              <View style={styles.input}>
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
              {/*confirm password input*/}
              <View style={styles.input}>
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
