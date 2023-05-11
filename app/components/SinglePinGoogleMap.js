import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {MAPS_API_KEY} from '@env';

export default function SinglePinGoogleMap({reportLat, reportLong}) {
  const lat = parseFloat(reportLat);
  const long = parseFloat(reportLong);
  const region = {
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.175,
    longitudeDelta: 0.175,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} scrollEnabled={false} zoomEnabled={false} key={MAPS_API_KEY}>
          <Marker
            coordinate={{ latitude: lat, longitude: long }}
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