import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function MapConfigMarker({ map, setMap }) {
  return (
    <View style={styles.container}>
      <Text>Marker Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 20,
  },
});