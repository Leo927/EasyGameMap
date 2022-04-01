import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import MapCard from '../map-card/map-card';
import { getMaps } from '../../data/map';


export default function HomeScreen() {
  const [maps, setMaps] = React.useState([]);

  // on reload grab all maps
  React.useEffect(async () => {
    setMaps(await getMaps());
  }, [])

  return (
    <View style={styles.container}>
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
