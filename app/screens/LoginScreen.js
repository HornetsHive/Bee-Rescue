import * as React from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ImageBackground,
  Button,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
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
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SignUpScreen", { screen: "SignUpScreen" })
            }
          >
            <Text
              style={{
                fontFamily: "Comfortaa",
                color: "#d92978",
                fontWeight: "bold",
              }}
            >
              New? Sign up here
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
          //onPress={() =>
          //navigation.navigate("SignUpScreen", { screen: "SignUpScreen" })
          //}
          >
            <Text
              style={{
                fontFamily: "Comfortaa",
                color: "#d92978",
                fontWeight: "bold",
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          //onPress={() =>
          //navigation.navigate("SignUpScreen", { screen: "SignUpScreen" })
          //}
          >
            <Text
              style={{
                fontFamily: "Comfortaa",
                color: "#d92978",
                fontWeight: "bold",
              }}
            >
              Privacy
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  footer: {
    flex: 0.2,
    alignSelf: "flex-start",
    position: "absolute",
    marginLeft: 110,
    top: 560,
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
});
