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

export default function ForgotPassScreen({ navigation }) {
  const [enteredEmail, setEmail] = useState("");
  const [user, setUser] = React.useState([]);
  var email, pass, bk_id;
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  //send email to user with unique code
  const sendEmail = () => {};

  //then when unique code has een entered,
  //verify it and then allow user to reset password

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
              <View style={styles.button}>
                <Button
                  color="#d92978"
                  title="Submit"
                  onPress={() => {
                    login();
                  }}
                />
              </View>
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
