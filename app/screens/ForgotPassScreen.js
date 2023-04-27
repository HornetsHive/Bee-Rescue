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
  // ensure that code input box does not go over 4 digits

  const codeLength = value.length;
  if (codeLength > 4) {
    return `${codeValue.slice(0, 4)}`;
  }
  return codeValue;
}
// -------------------- start of forgot pass screen -----------------------

export default function ForgotPassScreen({ navigation }) {
  const [userID, setID] = useState("");
  const [email, setUserEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, confirmPass] = useState("");

  const [enteredCode, setCode] = useState("");
  const [enteredEmail, setEmail] = useState("");
  const [actualCode, setActualCode] = useState("");

  const [errors, setErrors] = useState("");
  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const [shouldShow, setShouldShow] = useState(true);
  const [shouldShow2, setShouldShow2] = useState(true);
  const [shouldShow3, setShouldShow3] = useState(true);

  const [inputErrCode, setInputErrCode] = useState(false);
  const [inputStyleCode, setInputStyleCode] = useState(styles.inputCode);

  const [inputErrPass, setInputErrPass] = useState(false);
  const [inputErrPassConfirm, setInputErrPassConfirm] = useState(false);
  const [inputErrEmail, setInputErrEmail] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPass, setValidPass] = useState(true);
  const [validCode, setValidCode] = useState(true);
  const [validPassConfirm, setValidPassConfirm] = useState(true);
  const [inputStylePass, setInputStylePass] = useState(styles.input);
  const [inputStyleEmail, setInputStyleEmail] = useState(styles.input);
  const [inputStylePassConfirm, setInputStylePassConfirm] = useState(
    styles.input
  );

  var code;

  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  //verify if email is associated with a beekeeper
  async function attemptEmailSubmit() {
    //check if user actually put in input
    if (!enteredEmail) {
      console.log("Please enter email");
      setInputStyleEmail(styles.inputError);
      setInputErrEmail(true);
      return;
    }

    // check if the email entered is in the database
    await Axios.get("http://45.33.38.54:3001/bk_user", {
      params: { email: enteredEmail },
    })
      .then((res) => {
        if (res != null && res != undefined) {
          //map email and id from database if found
          mapUserData(res.data);

          if (email == enteredEmail) {
            //sendEmail();
            setValidEmail(true);
            setShouldShow2(!shouldShow2);
            setShouldShow(!shouldShow);
            console.log("email sent");
          }
        } else {
          console.log("not a registered email");
          setValidEmail(false);
          setInputStyleEmail(styles.inputError);
        }
      })
      .catch(function (error) {
        if (error) console.log(error);
      });
  }

  async function mapUserData(userData) {
    userData.map((user) => {
      setUserEmail(user.email);
      setID(user.bk_id);
    });
  }

  //send email to user with unique code
  async function sendEmail() {
    //generate unique code and show code text box
    genCode();
    //send email
    Axios.post("http://45.33.38.54:3001/sendCode", {
      email: enteredEmail,
      code: code,
    }).then(() => {
      console.log("email sent");
    });
  }

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
  async function resetPass() {
    //verify code
    if (!enteredCode) {
      console.log("Please enter code");
      setInputStyleCode(styles.inputCodeErr);
      setInputErrCode(true);
      return;
    }
    if (enteredCode != actualCode) {
      console.log("invalid code");
      setInputStyleCode(styles.inputCodeErr);
      setValidCode(false);
      return;
    }
    setShouldShow2(!shouldShow2);
    setShouldShow3(!shouldShow3);
    console.log("code confirmed!");
  }

  const updatePass = () => {
    //validate password
    const err = validate();
    if (err) {
      return;
    }
    console.log("pass confirmed!");

    //updates password in database with axios then navigates to login
    //maybe check if password is not the same as it was before?
    Axios.post("http://45.33.38.54:3001/bk_pass_update", {
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

  //validate entered info
  const validate = () => {
    const newErrors = { ...errors };
    if (!pass || !passConfirm) {
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
    if (isValidPassword(pass) && pass != passConfirm) {
      newErrors.passConfirm = "passwords don't match";
      console.log("passwords don't match");
      setInputStylePassConfirm(styles.inputError);
      setValidPassConfirm(false);
    }
    setErrors(newErrors);

    return !Object.values(newErrors).every((error) => error === "");
  };

  //resets error text and error box based on the parameters passed
  async function resetErrors(errType) {
    if (errType === "email") {
      setInputStyleEmail(styles.input);
      setInputErrEmail(false);
      if (!validEmail) {
        setValidEmail(true);
      }
    }
    if (errType === "code") {
      setInputStyleCode(styles.inputCode);
      setInputErrCode(false);
      if (!validCode) {
        setValidCode(true);
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

            <View style={{ width: 300, paddingTop: 15 }}>
              {shouldShow ? (
                <View>
                  <Text style={styles.textRegular}>verify email</Text>
                  {inputErrEmail ? (
                    <Text style={styles.textError}>Please enter email</Text>
                  ) : (
                    <View></View>
                  )}
                  {!validEmail ? (
                    <Text style={styles.textError}>
                      Please enter a valid email
                    </Text>
                  ) : (
                    <View></View>
                  )}
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
                  <View style={styles.button}>
                    <Button
                      color="#d92978"
                      title="Submit"
                      onPress={() => {
                        attemptEmailSubmit();
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
                        style={inputStyleCode}
                        label="code"
                        keyboardType="numeric"
                        placeholder={"enter code"}
                        name="code"
                        onChangeText={(e) => {
                          handleInput(e);
                          resetErrors("code");
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
                    {inputErrCode ? (
                      <Text style={styles.textError}>Please enter a code</Text>
                    ) : (
                      <View></View>
                    )}
                    {!validCode ? (
                      <Text style={styles.textError}>Invalid code</Text>
                    ) : (
                      <View></View>
                    )}
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
                  <View style={styles.input}>
                    <TextInput
                      style={{ marginRight: 25 }}
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

                  <Text style={styles.textRegular}>confirm new password</Text>
                  {/*confirm password input*/}

                  <View style={styles.input}>
                    <TextInput
                      style={{ marginRight: 25 }}
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
