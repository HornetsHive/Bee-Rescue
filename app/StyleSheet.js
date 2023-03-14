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
  }
});

export { styles };
