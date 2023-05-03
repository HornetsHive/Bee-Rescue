import * as React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../StyleSheet";
import { useFonts } from "expo-font";
import { useState, useRef } from "react";
import Axios from "axios";
import {
  Text,
  View,
  Switch,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";

//set the format for the phone number text entry
function formatPhoneNumber(value) {
  if (!value) return value;

  // clean and format phone number input
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
}
// -------------------- start of preference screen -----------------------

export default function PreferencesScreen({ route, navigation }) {
  const userEmail = route.params.email;
  const userPass = route.params.pass;

  const switchColor = { false: "#808080", true: "#7dad23" };
  const [userID, setUserID] = useState([]);
  const [errors, setErrors] = useState("");
  const newErrors = { ...errors };

  const [validZip, setValidZip] = useState(true);
  const [inputErrFName, setInputErrFName] = useState(false);
  const [inputErrLName, setInputErrLName] = useState(false);
  const [inputErrPhone, setInputErrPhone] = useState(false);
  const [inputErrAddr, setInputErrAddr] = useState(false);
  const [inputErrCity, setInputErrCity] = useState(false);
  const [inputErrZip, setInputErrZip] = useState(false);

  const [inputStyleFName, setInputStyleFName] = useState(styles.inputRounded);
  const [inputStyleLName, setInputStyleLName] = useState(styles.inputRounded);
  const [inputStylePhone, setInputStylePhone] = useState(styles.inputRounded);
  const [inputStyleAddr, setInputStyleAddr] = useState(styles.inputRounded);
  const [inputStyleCity, setInputStyleCity] = useState(styles.inputRounded);
  const [inputStyleZip, setInputStyleZip] = useState(styles.inputRounded);

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [phone_no, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [cooperative, setCoop] = useState(false);
  const [ability1, setAbility1] = useState(false);
  const [ability2, setAbility2] = useState(false);
  const [ability3, setAbility3] = useState(false);
  const [ability4, setAbility4] = useState(false);
  const [ability5, setAbility5] = useState(false);
  const [ability6, setAbility6] = useState(false);
  const [ability7, setAbility7] = useState(false);
  const [ability8, setAbility8] = useState(false);
  const [ability9, setAbility9] = useState(false);
  const [ability10, setAbility10] = useState(false);
  const [ability11, setAbility11] = useState(false);
  const [ability12, setAbility12] = useState(false);
  const [ability13, setAbility13] = useState(false);
  const [equipment1, setEquip1] = useState(false);
  const [equipment2, setEquip2] = useState(false);
  const [equipment3, setEquip3] = useState(false);
  const [loaded] = useFonts({
    Comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
    ComfortaaBold: require("../assets/fonts/Comfortaa-Bold.ttf"),
    RoundSerif: require("../assets/fonts/rounded-sans-serif.ttf"),
  });

  const scroller = useRef(null);
  const scrollToTop = () => {
    if (scroller.current) {
      scroller.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  const updateNewUser = async () => {
    try {
      // Get the beekeeper id that matches entered email and pass to verify login
      const res = await Axios.get("https://beerescue.net:3001/bk_get", {
        params: { email: userEmail, pass: userPass },
      }).catch(function (error) {
        console.log(error);
        return null;
      });

      if (!res || !res.data || res.data.length === 0) {
        console.error("Beekeeper not found");
        return;
      }
      const beekeeperId = res.data[0].bk_id;

      //validate preference input
      const err = validate();
      if (err) {
        console.log("input errors");
        scrollToTop();
        return;
      }

      // Use Promise.all to wait for both posts to resolve
      await Promise.all([
        //axios.post to update beekeeper personal info
        Axios.post("https://beerescue.net:3001/bk_update", {
          fname: fname,
          lname: lname,
          phone_no: phone_no,
          address: address,
          city: city,
          zip: zip,
          bk_id: beekeeperId,
        }),

        //axios post again to update beekeeper qualifications
        Axios.post("https://beerescue.net:3001/bk_qualif_update", {
          ground_swarms: ability1,
          valve_or_water_main: ability2,
          shrubs: ability3,
          low_tree: ability4,
          mid_tree: ability5,
          tall_tree: ability6,
          fences: ability7,
          low_structure: ability8,
          mid_structure: ability9,
          chimney: ability10,
          interior: ability11,
          cut_or_trap_out: ability12,
          traffic_accidents: ability13,
          bucket_w_pole: equipment1,
          ladder: equipment2,
          mechanical_lift: equipment3,
          bk_id: beekeeperId,
        }),
      ]);

      console.log("successful insert");
      //navigate to home screen and pass bk_id
      navigation.replace("HomeScreen", {
        screen: "HomeScreen",
        bk_id: beekeeperId,
      });
    } catch (error) {
      console.error("Error in updateNewUser: " + error);
      Alert.alert(
        error.message,
        "Something went wrong processing your request",
        [
          {
            text: "OK",
          },
        ]
      );
    }
  };

  const validate = () => {
    //check for errors and set them if found
    if (!fname || !lname || !phone_no || !address || !city || !zip) {
      if (!fname) {
        newErrors.fname = "This field is required";
        setInputStyleFName(styles.inputError2);
        setInputErrFName(true);
      }
      if (!lname) {
        newErrors.lname = "This field is required";
        setInputStyleLName(styles.inputError2);
        setInputErrLName(true);
      }
      if (!phone_no) {
        newErrors.phone_no = "This field is required";
        setInputStylePhone(styles.inputError2);
        setInputErrPhone(true);
      }
      if (!address) {
        newErrors.address = "This field is required";
        setInputStyleAddr(styles.inputError2);
        setInputErrAddr(true);
      }
      if (!city) {
        newErrors.city = "This field is required";
        setInputStyleCity(styles.inputError2);
        setInputErrCity(true);
      }
      if (!zip) {
        newErrors.zip = "This field is required";
        setInputStyleZip(styles.inputError2);
        setInputErrZip(true);
      }
    }

    if (zip != "" && (isNaN(zip) || zip.length < 3 || zip.length > 5)) {
      newErrors.zip = "Please enter a valid zip";
      setValidZip(false);
    }

    setErrors(newErrors);
    return !Object.values(newErrors).every((error) => error === "");
  };

  //resets error text and error box based on the parameters passed
  async function resetErrors(errType) {
    if (errType === "fName") {
      setInputStyleFName(styles.inputRounded);
      setInputErrFName(false);
    }
    if (errType === "lName") {
      setInputStyleLName(styles.inputRounded);
      setInputErrLName(false);
    }
    if (errType === "phone") {
      setInputStylePhone(styles.inputRounded);
      setInputErrPhone(false);
    }
    if (errType === "addr") {
      setInputStyleAddr(styles.inputRounded);
      setInputErrAddr(false);
    }
    if (errType === "city") {
      setInputStyleCity(styles.inputRounded);
      setInputErrCity(false);
    }
    if (errType === "zip") {
      setInputStyleZip(styles.inputRounded);
      setInputErrZip(false);
    }
  }

  //dynamically reformat phone number input
  const handleInput = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e);
    setPhone(formattedPhoneNumber);
  };

  if (!loaded) {
    return null;
  }

  return (
    <KeyboardAwareScrollView ref={scroller}>
      <SafeAreaView style={styles.container} width={"90%"}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.textLarge}>Preferences</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <ScrollView
            ref={scroller}
          >
            <Text style={styles.textRegularPink}>Personal Information</Text>

            <View style={styles.aligned}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={inputStyleFName}
                label="fname"
                placeholder="Your First Name"
                required
                isInvalid={Boolean(errors.fname)}
                type="text"
                onChangeText={(fname) => {
                  setFName(fname);
                  setErrors({ ...errors, fname: "" });
                  resetErrors("fName");
                }}
              />
            </View>
            {inputErrFName ? (
              <Text style={styles.textErrorRight}>
                Please enter your first name
              </Text>
            ) : (
              <View></View>
            )}

            <View style={styles.aligned}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={inputStyleLName}
                label="lname"
                placeholder="Your Last Name"
                required
                isInvalid={Boolean(errors.lname)}
                type="text"
                onChangeText={(lname) => {
                  setLName(lname);
                  setErrors({ ...errors, lname: "" });
                  resetErrors("lName");
                }}
              />
            </View>
            {inputErrLName ? (
              <Text style={styles.textErrorRight}>
                Please enter your last name
              </Text>
            ) : (
              <View></View>
            )}

            <View style={styles.aligned}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={inputStylePhone}
                label="phone_no"
                required
                isInvalid={Boolean(errors.phone_no)}
                type="text"
                placeholder="+1 (XXX) XXX - XXXX"
                onChangeText={(e) => {
                  handleInput(e), setErrors({ ...errors, phone_no: "" });
                  resetErrors("phone");
                }}
                value={phone_no}
              />
            </View>
            {inputErrPhone ? (
              <Text style={styles.textErrorRight}>
                Please enter your phone number
              </Text>
            ) : (
              <View></View>
            )}

            <View style={styles.aligned}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={inputStyleAddr}
                label="address"
                placeholder="Your Address"
                required
                isInvalid={Boolean(errors.address)}
                type="text"
                onChangeText={(address) => {
                  setAddress(address);
                  setErrors({ ...errors, address: "" });
                  resetErrors("addr");
                }}
              />
            </View>
            {inputErrAddr ? (
              <Text style={styles.textErrorRight}>Please enter an address</Text>
            ) : (
              <View></View>
            )}

            <View style={styles.aligned}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={inputStyleCity}
                label="city"
                placeholder="Your City"
                required
                isInvalid={Boolean(errors.city)}
                type="text"
                onChangeText={(city) => {
                  setCity(city);
                  setErrors({ ...errors, city: "" });
                  resetErrors("city");
                }}
              />
            </View>
            {inputErrCity ? (
              <Text style={styles.textErrorRight}>Please enter a city</Text>
            ) : (
              <View></View>
            )}

            <View style={styles.aligned}>
              <Text style={styles.inputLabel}>Zip Code</Text>
              <TextInput
                style={inputStyleZip}
                label="zip"
                required
                isInvalid={Boolean(errors.zip)}
                type="text"
                placeholder="(e.g., 12345)"
                onChangeText={(zip) => {
                  setZip(zip);
                  setErrors({ ...errors, zip: "" });
                  resetErrors("zip");
                  setValidZip(true);
                }}
              />
            </View>
            {inputErrZip ? (
              <Text style={styles.textErrorRight}>Please enter a zip code</Text>
            ) : (
              <View></View>
            )}
            {!validZip ? (
              <Text style={styles.textErrorRight}>
                Please enter a valid zip code
              </Text>
            ) : (
              <View></View>
            )}

            {/*
            <View style={styles.divider}>{}</View>

            <Text style={styles.textRegularPink}>
              What is your max swarm height preference?
            </Text>
            <View style={styles.aligned}>
              <Text style={styles.inputLabel}>Max Swarm Height</Text>
              <TextInput
                style={styles.inputRounded}
                label="maxHeight"
                required
                type="text"
                placeholder="e.g., 12in, 2ft"
                onChangeText={(maxHeight) => {
                  setMaxHeight(maxHeight);
                }}
              />
            </View>
            <Text style={styles.textRegularPink}>
              Are you willing to work with other beekeepers?
            </Text>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>
                {cooperative ? (
                  <Text style={styles.inputLabel}>Yes</Text>
                ) : (
                  <Text style={styles.inputLabel}>No</Text>
                )}
              </Text>
              <View style={styles.row}>
                <View style={styles.switch}>
                  <Switch
                    value={cooperative}
                    trackColor={switchColor}
                    thumbColor={cooperative ? "#f4f3f4" : "#f4f3f4"}
                    onValueChange={() => setCoop(!cooperative)}
                  ></Switch>
                </View>
              </View>
            </View>
            */}

            {/*
            <View style={styles.divider}></View>

            <Text style={styles.textRegularPink}>
              Please indicate the locations you are skilled at gathering swarm
              clusters.
            </Text>

            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>Ground Swarms</Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={ability1 ? "#FFFFFF" : "#f4f3f4"}
                value={ability1}
                onValueChange={() => {
                  setAbility1(!ability1);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>Valve Box/Water Main</Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={ability2 ? "#FFFFFF" : "#f4f3f4"}
                value={ability2}
                onValueChange={() => {
                  setAbility2(!ability2);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>Shrubs</Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={ability3 ? "#FFFFFF" : "#f4f3f4"}
                value={ability3}
                onValueChange={() => {
                  setAbility3(!ability3);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>Low Tree (Up to 10 feet)</Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={ability4 ? "#FFFFFF" : "#f4f3f4"}
                value={ability4}
                onValueChange={() => {
                  setAbility4(!ability4);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>
                Mid Size Tree (Up to 20 feet)
              </Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={ability5 ? "#FFFFFF" : "#f4f3f4"}
                value={ability5}
                onValueChange={() => {
                  setAbility5(!ability5);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>Tall Tree (Over 20 feet)</Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={ability6 ? "#FFFFFF" : "#f4f3f4"}
                value={ability6}
                onValueChange={() => {
                  setAbility6(!ability6);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>Fences</Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={ability7 ? "#FFFFFF" : "#f4f3f4"}
                value={ability7}
                onValueChange={() => {
                  setAbility7(!ability7);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>
                Low Structure (Up to 10 feet)
              </Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={ability8 ? "#FFFFFF" : "#f4f3f4"}
                value={ability8}
                onValueChange={() => {
                  setAbility8(!ability8);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>
                Medium Tall Structure (up to 20 feet)
              </Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={ability9 ? "#FFFFFF" : "#f4f3f4"}
                value={ability9}
                onValueChange={() => {
                  setAbility9(!ability9);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>Chimney</Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={ability10 ? "#FFFFFF" : "#f4f3f4"}
                value={ability10}
                onValueChange={() => {
                  setAbility10(!ability10);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>
                Interior (Office, House, Shed, Garage, etc)
              </Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={ability11 ? "#FFFFFF" : "#f4f3f4"}
                value={ability11}
                onValueChange={() => {
                  setAbility11(!ability11);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>Cut Out/Trap Out</Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={ability12 ? "#FFFFFF" : "#f4f3f4"}
                value={ability12}
                onValueChange={() => {
                  setAbility12(!ability12);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>Traffic Accidents</Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={ability13 ? "#FFFFFF" : "#f4f3f4"}
                value={ability13}
                onValueChange={() => {
                  setAbility13(!ability13);
                }}
              ></Switch>
            </View>
            */}
            
            {/*
            <View style={styles.divider}></View>

            <Text style={styles.textRegularPink}>
              What special equipment do you have at your disposal to gather swarm
              clusters?
            </Text>

            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>Bucket with pole</Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={equipment1 ? "#FFFFFF" : "#f4f3f4"}
                value={equipment1}
                onValueChange={() => {
                  setEquip1(!equipment1);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>Ladders</Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={equipment2 ? "#FFFFFF" : "#f4f3f4"}
                value={equipment2}
                onValueChange={() => {
                  setEquip2(!equipment2);
                }}
              ></Switch>
            </View>
            <View style={styles.aligned}>
              <Text style={styles.switchLabel}>Mechanical Lift</Text>
              <Switch
                style={styles.switch}
                trackColor={switchColor}
                thumbColor={equipment3 ? "#FFFFFF" : "#f4f3f4"}
                value={equipment3}
                onValueChange={() => {
                  setEquip3(!equipment3);
                }}
              ></Switch>
            </View>
            */}

            <View style={styles.divider}></View>
            

            <View style={styles.saveButton}>
              <Button
                color="#da628c"
                title="Save Changes & Continue"
                onPress={() => {
                  updateNewUser();
                }}
              ></Button>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
