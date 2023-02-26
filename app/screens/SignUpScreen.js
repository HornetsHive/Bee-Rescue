import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, setState } from "react";
import { styles } from "../StyleSheet";
import { useFonts } from "expo-font";
import Axios from "axios";
import {
  Text,
  View,
  ImageBackground,
  Button,
  Image,
  SafeAreaView,
  TextInput,
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

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  /*const [form, setForm] = useState({
    bk_id: "",
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
  });*/

  //submit email and password
  const submitNewUser = (e) => {
    e.preventDefault();

    //validate submition
    /*const err = validate();
    if (err) {
      console.log("Please input all required fields");
      return;
    }*/

    Axios.post("http://localhost:3001/api/bk_insert", {
      fname: "test",
      lname: "test",
      email: email,
      phone_no: "test",
      address: "test",
      city: "test",
      zip: "test",
      pass: pass,
    }).then(() => {
      alert("successful insert");
    });
    console.log("User created!");
  };

  const validate = () => {
    const newErrors = { ...errors };
    if (!form.email) {
      newErrors.email = "This field is required";
      console.log("Please enter email");
    }
    if (!form.pass) {
      newErrors.pass = "This field is required";
      console.log("Please enter pasword");
    }
    if (!isValidPassword(form.pass)) {
      newErrors.pass = "Please enter a valid password";
      console.log("Please enter a valid password");
    }
    if (!isValidEmail(form.email)) {
      newErrors.email = "Please enter a valid email";
      console.log("Please enter a valid email");
    }

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
                //isInvalid={Boolean(errors.email)}
                //validationMessage={errors.email ? errors.email : null}
                type="text"
                name="email"
                onChange={setEmail}
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
                //isInvalid={Boolean(errors.pass)}
                //validationMessage={errors.pass ? errors.pass : null}
                type="text"
                name="password"
                onChange={setPass}
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

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
    flexDirection: "column",
    alignSelf: "center",
  },
  header: {
    flex: 0.2,
  },
  middle: {
    top: 150,
    flex: 0.6,
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
  },
  titleText: {
    alignItems: "center",
    fontSize: 40,
    fontFamily: "RoundSerif",
  },
  text: {
    alignItems: "center",
    paddingTop: "5%",
    fontSize: 22,
    fontFamily: "Comfortaa",
  },
  textRegular: {
    fontSize: 18,
    paddingLeft: 10,
    fontFamily: "Comfortaa",
  },
  textSmall: {
    fontSize: 12,
    paddingLeft: 10,
    fontFamily: "Comfortaa",
  },
  input: {
    height: 50,
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderColor: "white",
  },
  button: {
    height: 50,
    margin: 10,
  },
});*/
