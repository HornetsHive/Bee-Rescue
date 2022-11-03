import React from 'react';
import {
    View,
    ImageBackground,
    Button,
    Image,} from 'react-native';

function SignUpScreen(props) {
    return (
        <View style={styles.container}>
      
            <ImageBackground style={styles.background}
            source={require("../assets/gradient3.png")}
            resizeMode="cover">

                <Image
                style={styles.image}
                source={require("../assets/LoginBeePicture.png")} />

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
      justifyContent: 'center'
    },
    button: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      textAlign: 'center',
      height: 100,
      width: 100
    },
    image: {
      justifyContent: 'center',
      height: 200,
      width: 500
    }
});

export default SignUpScreen;