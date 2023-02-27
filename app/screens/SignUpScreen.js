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
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return strongRegex.test(pass);
}

export default function SignUpScreen({ navigation }) {
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState("");

  //submit email and password
  const submitNewUser = (e) => {
    e.preventDefault();

    //validate submition
    const err = validate();
    if (err) {
      return;
    }

    Axios.post("http://10.0.2.2:3001/api/bk_insert", {
      email: email,
      pass: pass,
    })
      .catch(function (error) {
        if (error) console.log(error);
      })
      .then(() => {
        console.log("User created!");
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
    setErrors(newErrors);

    //navigate to prefrences page
    navigation.navigate("PreferencesScreen", {
      screen: "PreferencesScreen",
    });

    return !Object.values(newErrors).every((error) => error === "");
  }; /////////////////////////////////////////////////////////////////////////////

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={require("../assets/gradient1.png")}
        resizeMode="cover"
      >
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image
              style={{
                alignSelf: "center",
                resizeMode: "contain",
                height: 145,
                width: 500,
              }}
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
                name="email"
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
                name="password"
                onChangeText={(pass) => {
                  setPass(pass);
                  setErrors({ ...errors, pass: "" });
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
