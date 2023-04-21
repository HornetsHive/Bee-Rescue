import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: "column",
    alignSelf: "center",
  },
  header: {
    flex: 1,
  },
  middle: {
    flex: 0.5,
    alignItems: "center",
    alignSelf: "center",
  },
  footer: {
    flex: 0.5,
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 20,
  },
  titleText: {
    marginTop: "1%",
    alignItems: "center",
    fontSize: 40,
    fontFamily: "RoundSerif",
  },
  text: {
    alignItems: "center",
    paddingTop: "3%",
    fontSize: 22,
    fontFamily: "Comfortaa",
  },
  textRegular: {
    fontSize: 18,
    paddingLeft: 10,
    fontFamily: "Comfortaa",
  },
  textError: {
    fontSize: 14,
    paddingLeft: 10,
    color: "red",
    textAlign: "center",
    fontFamily: "Comfortaa",
  },
  textSmall: {
    fontSize: 12,
    paddingLeft: 10,
    fontFamily: "Comfortaa",
  },
  textSmallTwo: {
    fontSize: 14,
    paddingLeft: 10,
    textAlign: "center",
    fontFamily: "Comfortaa",
  },
  hyperLinkText: {
    fontFamily: "Comfortaa",
    color: "#d92978",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 5,
  },
  inputError: {
    height: 50,
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderColor: "#ff4d36",
    borderWidth: 2.1,
    borderRadius: 5,
  },
  passContainer: {
    flex: 1,
    bottom: 15,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  inputCode: {
    height: 50,
    margin: 10,
    padding: 10,
    fontSize: 18,
    width: "50%",
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderColor: "white",
  },
  button: {
    height: 50,
    margin: 10,
  },
  img: {
    alignSelf: "center",
    resizeMode: "contain",
    height: 145,
    width: 500,
  },
  logoutContainer: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    paddingBottom: 3,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  eyeIcon: { width: 20, height: 20 },
});

export { styles };
