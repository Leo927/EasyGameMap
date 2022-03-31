import React from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { getDimension } from './map-view-helper';

const { screenWidth, screenHeight } = Dimensions.get('window');

export default function EgmMapView (props){

  const map = {
    Image: 'https://www.powerpyx.com/wp-content/uploads/elden-ring-full-world-map.jpg',
    name: "Elden Ring",
    width: 1920,
    height: 1851,
  }

  React.useEffect(async ()=>{
  },[])

  return (
    <View style={styles.container}>
      <Image 
        source={{uri:map.Image}}
        style={[
          {width:100, height:100},
          styles.mapImage,
        ]}/>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapImage:{
    position:"absolute",
    top:100,
    left:100
  }
});
