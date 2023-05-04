import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

export default function GoogleMap({ reportCoordinates, homeCoordinates, bk_id}) {
  const region = {
    latitude: homeCoordinates.latitude,
    longitude: homeCoordinates.longitude,
    latitudeDelta: 0.175,
    longitudeDelta: 0.175,
  };

  const navigation = useNavigation();

  const handleMarkerPress = (reportId) => {
    console.log("Going to info: " + reportId);
    navigation.navigate("ReportInfoScreen", {
      screen: "ReportInfoScreen",
      r_id: reportId,
      bk_id: bk_id
    });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {reportCoordinates.map((coord) => (
          <Marker
            key={coord.id}
            coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
          >
            <Callout
              onPress={() => handleMarkerPress(coord.id)}
              style={styles.callout}
            >
              <TouchableOpacity>
                <View>
                  <Text>Tap for details</Text>
                </View>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});