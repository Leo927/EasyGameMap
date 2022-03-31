/**
 * Implements a pure react native map view. 
 */
import React from 'react';
import { StyleSheet, View, Dimensions, Image, PanResponder, Animated } from 'react-native';


export default function EgmMapView (props){
  const mapPos = React.useRef(new Animated.ValueXY()).current;
  const mapSize = React.useRef(new Animated.ValueXY()).current;

  const mapPan = PanResponder.create({
    onStartShouldSetPanResponder:()=>true,
  })

  const map = {
    Image: 'https://www.powerpyx.com/wp-content/uploads/elden-ring-full-world-map.jpg',
    name: "Elden Ring",
    width: 100,
    height: 100,
  }

  // reset the map size to default.
  const resetView = ()=>{
    Image.getSize(map.Image, (mapWidth, mapHeight)=>{
      // place the image at the center
      const window = Dimensions.get('window');
      const center_left = window.width/2;
      const center_top = window.height/2;
      //mapPos.setValue({x:center_left, y:center_top});

      mapPos.setValue({x:100, y:100});

      // set native map size
      mapSize.setValue({x:map.width, y:map.height});
    });
  }

  React.useEffect(()=>{
    resetView();
  },[])

  return (
    <View style={styles.container}>
      {/* Map Container */}
        
      <Animated.Image
        source={{uri:map.Image}}
        style={[
          {width:"80%", height:"80%"},
          mapPos.getLayout(),
          styles.mapImage
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
  }
});
