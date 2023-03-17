import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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

function MapScreen() {
  const initialRegion = {
    latitude: 38.56,
    longitude: -121.42,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker coordinate={{ latitude: 38.56, longitude: -121.42 }} />
      </MapView>
    </View>
  );
}

export default MapScreen;