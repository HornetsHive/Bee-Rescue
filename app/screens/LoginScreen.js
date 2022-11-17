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
        style={styles.background}
        source={require("../assets/gradient1.png")}
        resizeMode="cover"
      >
        <Image
          style={styles.image}
          source={require("../assets/LoginBeePicture.png")}
        />

        <Text style={styles.titleText}>Honey Bee Rescue</Text>
        <Text style={styles.text}>Login</Text>

        <View style={{ height: "55%", width: "100%", marginLeft: "15%" }}>
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
          style={{ bottom: 20 }}
          onPress={() =>
            navigation.navigate("SignUpScreen", { screen: "SignUpScreen" })
          }
        >
          <Text
            style={{
              fontFamily: "Comfortaa",
              color: "#d92978",
            }}
          >
            New? Sign up here
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    position: "absolute",
    height: "25%",
    width: "100%",
    top: "2%",
    margin: 10,
  },
  titleText: {
    position: "absolute",
    alignItems: "center",
    height: "69%",
    fontSize: 40,
    fontFamily: "RoundSerif",
  },
  text: {
    position: "absolute",
    alignItems: "center",
    height: "63%",
    paddingTop: "5%",
    fontSize: 20,
    fontFamily: "Comfortaa",
  },
  textRegular: {
    fontSize: 15,
    paddingLeft: 10,
    fontFamily: "Comfortaa",
  },
  input: {
    height: 50,
    width: "80%",
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderColor: "white",
  },
  button: {
    height: 50,
    width: "80%",
    margin: 10,
  },
});
