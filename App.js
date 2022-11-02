import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  Alert,
  Button,
  Image,
  SafeAreaView} from 'react-native';

export default function App() {
  console.log("App executed");//this can be used for debugging
  console.log(Dimensions.get("screen"));

  return (
    <View style={styles.container}>
      
    

    <ImageBackground style={styles.background}
      source={require("./App/assets/gradient3.png")}
      resizeMode="cover">

        <Image style={styles.image} source={require("./App/assets/LoginBeePicture.png")} />
        <View style={styles.logoContainer}>
          <Text>Bee Rescue</Text>
        </View>
        
        <View style={styles.button}>
          <Button
              color="#d92978"
              title="Sign Up"
              onPress={() => console.log('Simple Button pressed')}/>
        </View>
    </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    height: 170,
    width: '100%'
  },
  image: {
    justifyContent: 'center',
    height: '25%',
    width: '100%',
    position: 'absolute',
    top: 20,
  },
  logoContainer: {
    position: 'absolute',
    top: 250,
    fontSize: 90,
    fontWeight: 'bold'
  }
});
