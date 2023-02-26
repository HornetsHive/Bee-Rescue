import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import { styles } from "../StyleSheet";
import { useFonts } from "expo-font";
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

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone_no: "",
    address: "",
    city: "",
    zip: "",
    pass: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    pass: "",
  });

  //submit email and password
  const submitNewUser = (e) => {
    e.preventDefault();
    // Prevents React from resetting its properties:
    e.persist();

    //validate submition
    //const err = validate();
    //if (err) {
    //console.log("Please input all required fields");
    //return;
    //}

    Axios.post("http://localhost:3001/api/bk_insert", {
      fname: "test",
      lname: "test",
      email: "emailTest",
      phone_no: "test",
      address: "test",
      city: "test",
      zip: "test",
      pass: "pass",
    })
      .then(() => {
        console.log("User created!");
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("Beekeeper possibly submitted (; ;)");
  };

  const validate = () => {
    const newErrors = { ...errors };
    //if (!form.email) {
    //newErrors.email = "This field is required";
    //console.log("Please enter email");
    //}
    //if (!form.pass) {
    //newErrors.pass = "This field is required";
    //console.log("Please enter pasword");
    // }
    //if (!isValidPassword(form.pass)) {
    //newErrors.pass = "Please enter a valid password";
    //console.log("Please enter a valid password");
    //}
    //if (!isValidEmail(form.email)) {
    //newErrors.email = "Please enter a valid email";
    //console.log("Please enter a valid email");
    //}

    setErrors(newErrors);
    return !Object.values(newErrors).every((error) => error === "");
  };

  ////////////////////////////////////////////////////////////////

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
                onChange={(e) => {
                  setForm((prevState) => ({
                    ...prevState,
                    email: e.target,
                  }));
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
                onChange={(e) => {
                  setForm((prevState) => ({
                    ...prevState,
                    pass: e.target,
                  }));
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
