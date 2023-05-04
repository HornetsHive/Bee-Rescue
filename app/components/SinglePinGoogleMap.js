import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function SinglePinGoogleMap({reportLat, reportLong}) {
  const region = {
    latitude: reportLat,
    longitude: reportLong,
    latitudeDelta: 0.175,
    longitudeDelta: 0.175,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} scrollEnabled={false}>
          <Marker
            coordinate={{ latitude: reportLat, longitude: reportLong }}
          >
          </Marker>
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
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
});