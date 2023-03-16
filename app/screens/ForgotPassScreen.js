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

//set the format for the phone number text entry
function formatCodeInput(value) {
  if (!value) return value;
  const codeValue = value;
  // ensure that code input box does not go over 4 diits

  const codeLength = value.length;
  if (codeLength > 4) {
    return `${codeValue.slice(0, 4)}`;
  }
  return codeValue;
}
// -------------------- start of forgot pass screen -----------------------

export default function ForgotPassScreen({ navigation }) {
  const [shouldShow, setShouldShow] = useState(true);
  const [enteredEmail, setEmail] = useState("");
  const [user, setUser] = React.useState([]);
  const [actualCode, setActualCode] = useState("");
  const [enteredCode, setCode] = useState("");
  var email, code;
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  //send email to user with unique code
  const submitEmail = () => {
    // check if the email entered is in the database
    Axios.get("http://10.0.2.2:3001/api/bk_user", {
      params: { email: enteredEmail },
    }).then((res) => {
      setUser(res.data);
    });

    //map email from database if found
    user.map((user) => {
      email = user.email;
    });

    if (email != null) {
      sendEmail();
      console.log("email sent");
    } else {
      console.log("not a registered email");
    }
    setShouldShow(!shouldShow);
  };

  const sendEmail = () => {
    //verify if email is associated with a beekeeper

    //generate unique code and show cod textbox
    genCode();
    //send email
    Axios.post("http://10.0.2.2:3001/api/sendCode", {
      email: enteredEmail,
      code: code,
    }).then(() => {
      console.log("email sent");
    });
  };

  const genCode = () => {
    var digits = "0123456789";
    code = "";
    for (let i = 0; i < 4; i++) {
      code += digits[Math.floor(Math.random() * 10)];
    }
    setActualCode(code);
    return code;
  };

  //reset user password after verifying entered code
  const resetPass = () => {
    //verify code
    if (enteredCode != actualCode) {
      console.log("invalid code");
      return;
    } else {
      //make another axios post to update pasword
      console.log("code confirmed!");
    }
  };

  //dynamically reformat code input
  const handleInput = (e) => {
    const formattedCode = formatCodeInput(e);
    setCode(formattedCode);
  };

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
            <Text style={styles.text}>Reset Pasword</Text>

            <View style={{ width: 300, paddingTop: 10 }}>
              <Text style={styles.textRegular}>verify email</Text>
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

              {shouldShow ? (
                <View style={styles.button}>
                  <Button
                    color="#d92978"
                    title="Submit"
                    onPress={() => {
                      submitEmail();
                    }}
                  />
                </View>
              ) : (
                <View>
                  <View>
                    <Text style={styles.textSmallTwo}>
                      enter the code sent to your email
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignSelf: "center",
                      }}
                    >
                      <TextInput
                        style={styles.inputCode}
                        label="code"
                        keyboardType="numeric"
                        placeholder={"enter code"}
                        name="code"
                        onChangeText={(e) => {
                          handleInput(e);
                        }}
                        value={enteredCode}
                      />

                      <View style={{ alignSelf: "center" }}>
                        <TouchableOpacity
                          title="Resend Code"
                          onPress={() => {
                            sendEmail();
                            setCode("");
                          }}
                        >
                          <Text style={styles.hyperLinkText}>Resend Code</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={styles.button}>
                    <Button
                      color="#d92978"
                      title="Reset Password"
                      onPress={() => {
                        resetPass();
                        setCode("");
                        //navigate to another screen to reset the password??
                      }}
                    />
                  </View>
                </View>
              )}

              <View style={styles.button}>
                <Button
                  color="#bfbfbf"
                  title="Back"
                  onPress={() =>
                    navigation.navigate("LoginScreen", {
                      screen: "LoginScreen",
                    })
                  }
                ></Button>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
