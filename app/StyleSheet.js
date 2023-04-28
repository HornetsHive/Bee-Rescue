import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  //------------------------ main style containers
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
  body: {
    flex: 8,
    borderTopWidth: 1,
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

  //------------------------ text
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
  textLarge: {
    fontSize: 25,
    fontFamily: "Comfortaa",
  },
  textRegular: {
    fontSize: 18,
    paddingLeft: 10,
    fontFamily: "Comfortaa",
  },
  textRegularPink: {
    fontSize: 16,
    marginBottom: 10,
    paddingVertical: 5,
    color: "#fc6a8c",
    textAlign: "center",
    fontFamily: "ComfortaaBold",
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
  textError: {
    fontSize: 14,
    paddingLeft: 10,
    color: "red",
    textAlign: "center",
    fontFamily: "Comfortaa",
  },
  textErrorRight: {
    fontSize: 14,
    paddingLeft: 10,
    color: "red",
    textAlign: "right",
    fontFamily: "Comfortaa",
  },

  //------------------------ inputs & buttons
  input: {
    height: 50,
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 5,
  },
  inputRounded: {
    flex: 6,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    textAlign: "left",
    fontFamily: "Comfortaa",
    margin: "1%",
    padding: "1%",
  },
  inputLabel: {
    flex: 4,
    textAlign: "center",
    backgroundColor: "#d92978",
    borderRadius: 10,
    margin: "1%",
    padding: "1%",
    color: "white",
    paddingVertical: "2%",
    fontFamily: "Comfortaa",
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
  inputError2: {
    flex: 6,
    borderWidth: 1,
    borderColor: "#ff4d36",
    borderRadius: 10,
    textAlign: "left",
    fontFamily: "Comfortaa",
    margin: "1%",
    padding: "1%",
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
    borderRadius: 5,
  },
  inputCodeErr: {
    height: 50,
    margin: 10,
    padding: 10,
    fontSize: 18,
    width: "50%",
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderColor: "#ff4d36",
    borderWidth: 2.1,
    borderRadius: 5,
  },
  button: {
    height: 50,
    margin: 10,
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  switch: {
    flex: 1,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  switchLabel: {
    flex: 2,
    textAlign: "center",
    backgroundColor: "#d92978",
    borderRadius: 10,
    margin: "1%",
    padding: "1%",
    color: "white",
    paddingVertical: "2%",
    fontFamily: "Comfortaa",
  },

  //------------------------ containers
  passContainer: {
    flex: 1,
    bottom: 15,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  logoutContainer: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    paddingBottom: 3,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  //------------------------ miscellaneous
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  aligned: {
    display: "flex",
    flexDirection: "row",
  },
  img: {
    alignSelf: "center",
    resizeMode: "contain",
    height: 145,
    width: 500,
  },
  divider: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginVertical: 20,
  },
  eyeIcon: { width: 20, height: 20 },
});

export { styles };
