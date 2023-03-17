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

function isValidPassword(pass) {
  var strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,})/;
  return strongRegex.test(pass);
}

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
  const [shouldShow2, setShouldShow2] = useState(true);
  const [shouldShow3, setShouldShow3] = useState(true);

  const [enteredEmail, setEmail] = useState("");
  const [user, setUser] = React.useState([]);

  const [actualCode, setActualCode] = useState("");
  const [enteredCode, setCode] = useState("");
  const [errors, setErrors] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, confirmPass] = useState("");

  const [userID, setID] = useState("");
  var email, bk_id, code;

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

    //map email and id from database if found
    user.map((user) => {
      email = user.email;
      bk_id = user.bk_id;
      setID(bk_id);
    });

    //SMALL ERROR: this doesn't work on first press, but will work on second button press
    if (bk_id != null) {
      sendEmail();
      setShouldShow2(!shouldShow2);
      setShouldShow(!shouldShow);
      console.log("email sent");
    } else {
      console.log("not a registered email");
    }
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
    }
    setShouldShow2(!shouldShow2);
    setShouldShow3(!shouldShow3);
    console.log("code confirmed!");
  };

  const updatePass = () => {
    //validate password
    const err = validate();
    if (err) {
      return;
    }
    console.log("pass confirmed!");

    //update pasword in database with axios then navigate to login
    //maybe check if password is not the same as it was before?
    Axios.post("http://10.0.2.2:3001/api/bk_pass_update", {
      pass: pass,
      bk_id: userID,
    }).then(() => {
      console.log("password updated");
    });

    navigation.navigate("LoginScreen", {
      screen: "LoginScreen",
    });
  };

  //dynamically reformat code input
  const handleInput = (e) => {
    const formattedCode = formatCodeInput(e);
    setCode(formattedCode);
  };

  //validate entered pasword
  const validate = () => {
    const newErrors = { ...errors };
    if (!pass) {
      newErrors.pass = "This field is required";
      console.log("Please enter pasword");
    }
    if (!isValidPassword(pass)) {
      newErrors.pass = "Please enter a valid password";
      console.log("Please enter a valid password");
    }
    if (pass != passConfirm) {
      newErrors.passConfirm = "passwords don't match";
      console.log("passwords don't match");
    }
    setErrors(newErrors);

    return !Object.values(newErrors).every((error) => error === "");
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
            <Text style={styles.text}>Forgot Password?</Text>

            <View style={{ width: 300, paddingTop: 10 }}>
              {shouldShow ? (
                <View>
                  <Text style={styles.textRegular}>verify email</Text>
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
                  <View style={styles.button}>
                    <Button
                      color="#d92978"
                      title="Submit"
                      onPress={() => {
                        submitEmail();
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View></View>
              )}

              {shouldShow2 ? (
                <View></View>
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
                      }}
                    />
                  </View>
                </View>
              )}
              {shouldShow3 ? (
                <View></View>
              ) : (
                <View>
                  <Text style={styles.textRegular}>new password</Text>
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
                    type="text"
                    onChangeText={(pass) => {
                      setPass(pass);
                      setErrors({ ...errors, pass: "" });
                    }}
                  />

                  <Text style={styles.textRegular}>confirm new password</Text>
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
                      title="Confirm"
                      onPress={() => {
                        updatePass();
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