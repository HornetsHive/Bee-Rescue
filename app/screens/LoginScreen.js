import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../StyleSheet";
import * as React from "react";
import { useFonts } from "expo-font";
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

export default function LoginScreen({ navigation }) {
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

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
            <Text style={styles.text}>Login</Text>

            <View style={{ width: 300 }}>
              <Text style={styles.textRegular}>email</Text>
              <TextInput style={styles.input} placeholder="email" />
              <Text style={styles.textRegular}>password</Text>
              <TextInput
                style={styles.input}
                placeholder="password"
                secureTextEntry={true}
              />

              <View style={styles.button}>
                <Button
                  color="#d92978"
                  title="Login"
                  onPress={() =>
                    navigation.navigate("HomeScreen", { screen: "HomeScreen" })
                  }
                />
              </View>
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={() =>
                  navigation.navigate("SignUpScreen", {
                    screen: "SignUpScreen",
                  })
                }
              >
                <Text style={styles.hyperLinkText}>New? Sign up here</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
              //onPress={() =>
              //navigation.navigate("", { screen: "" })
              //}
              >
                <Text style={styles.hyperLinkText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
              //onPress={() =>
              //navigation.navigate("", { screen: "" })
              //}
              >
                <Text style={styles.hyperLinkText}>Privacy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
