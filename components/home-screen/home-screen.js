/**
 * Author: Songhao Li
 * Implements a home screen. 
 */
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import MapCard from '../map-card/map-card';
import { getMaps } from '../../data/map';

/**
 * Home screen contains a list of public maps.
 */
export default function HomeScreen() {
  const [maps, setMaps] = React.useState([]);

  // on reload grab all maps
  React.useEffect(async () => {
    setMaps(await getMaps());
  }, [])

  return (
    <View style={styles.container}>
      {/* Render all public maps */}
      <FlatList 
        data={maps}
        keyExtractor={(m)=>m._id}
        renderItem={({item, index})=>(<MapCard map={item}/>)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
