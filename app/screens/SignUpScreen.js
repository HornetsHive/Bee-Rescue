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
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  //submit email and password
  const submitNewUser = (e) => {
    e.preventDefault();

    //validate submition
    const err = validate();
    if (err) {
      return;
    }

    Axios.post("http://45.33.38.54:3001/bk_insert", {
      email: email,
      pass: pass,
    }).catch(function (error) {
      if (error) console.log(error);
    });
    console.log("User created!");

    //navigate to prefrences page
    navigation.navigate("PreferencesScreen", {
      screen: "PreferencesScreen",
      email: email,
      pass: pass,
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
      console.log("Please enter pasword");
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
              <TextInput
                style={styles.input}
                label="password"
                placeholder="password"
                required
                secureTextEntry={true}
                isInvalid={Boolean(errors.pass)}
                validationMessage={errors.pass ? errors.pass : null}
                type="text"
                onChangeText={(pass) => {
                  setPass(pass);
                  setErrors({ ...errors, pass: "" });
                }}
              />

              <Text style={styles.textRegular}>confirm password</Text>
              {/*confirm password input*/}
              <TextInput
                style={styles.input}
                label="confirmPassword"
                placeholder="password"
                required
                secureTextEntry={true}
                type="text"
                onChangeText={(passConfirm) => {
                  confirmPass(passConfirm);
                  setErrors({ ...errors, passConfirm: "" });
                }}
              />

              <View style={styles.button}>
                <Button
                  color="#d92978"
                  title="Sign Up"
                  onPress={submitNewUser}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
