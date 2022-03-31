/**
 * Implements a pure react native map view. 
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  PanResponder,
  Animated,
  FlatList
} from 'react-native';
import { Text } from 'react-native-paper';


// used to generate new id
// These ids only need to be unique within the same map. 
// It is very unlikely to have a collision.
import uuid from 'react-native-uuid';

import GetBuiltInIcons from '../../data/built-in-icons';
import MapViewMarker from './map-view-marker';



export default function EgmMapView(props) {
  // controls the position of the top left corner of the map 
  // from the top left corner of the parent
  const [mapPos, setMapPos] = React.useState({ x: 0, y: 0 });
  // controls the zoom level of the map
  const [mapZoom, setMapZoom] = React.useState(1);

  // left for potential dynamic swapping
  const iconSize = { x: 50, y: 50 }
  // control map panning
  const mapPan = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) =>
      true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
      true,
    //taken from Dr.TT lecture code.
    onPanResponderGrant: (e, g) => {
    },

    onPanResponderMove: (e, g) => {
      console.log(`pan moved`, g);
      setMapPos((current)=>({
        x: current.x + g.dx,
        y: current.y + g.dy
      }));
    },
    onPanResponderRelease: (e, gestureState) => {

    }
  })

  const map = {
    Image: 'https://www.powerpyx.com/wp-content/uploads/elden-ring-full-world-map.jpg',
    name: "Elden Ring",
    width: 1920,
    height: 1080,
    markerGroups: [
      'Apple',
      'Potato',
      'Chili',
    ],
    customIcons: {
      smile: '😀'
    },
    markers: [
      {
        id: 0,
        title: 'Smile Face',
        description: 'This is a simply smile face',
        isCustomIcon: true,
        iconId: 'smile',
        top: 100,
        left: 100,
        markerGroup: [
          'Potato'
        ]
      }
    ]
  }


  /**
   * Returns the absolute position of a marker according to 
   * position of map, zoom, and marker pos.
   * 
   * Preconditions
   * <1> mapPos must be defined
   * <2> mapZoom must be defined
   * <3> marker.left and marker.top must be defined
   * 
   * Returns: {x,y} absolute position on the parent
   */
  const GetAbsPosLayout = (marker) => {
    // calculate absolute position
    // use markerPos + [Marker.left, Marker.top] * zoom
    const absPosX = mapPos.x + marker.left * mapZoom;
    const absPosY = mapPos.y + marker.top * mapZoom;
    return { left: absPosX, top: absPosY }
  }


  // reset the map size to default.
  const resetView = () => {
    Image.getSize(map.Image, async (mapWidth, mapHeight) => {
      // place the image at the center
      const window = Dimensions.get('window');
      const center_left = window.width / 2;
      const center_top = window.height / 2;
      //mapPos.setValue({x:center_left, y:center_top});
      setMapZoom(2);
    });
  }

  function attachMarkerLayouts(markers) {
    markers.map(m => {
      const layout = GetAbsPosLayout(m)
      return { ...m, _layout: layout };
    });
  }

  React.useEffect(() => {
    console.log(`mapPos changed`, mapPos);
    map.markers = attachMarkerLayouts(map.markers);
  }, [mapPos, mapZoom, map])


  const renderMarker = (item) => {
    return (<View
      key={item.id}
      style={[{ left: absPosX, top: absPosY },
      styles.marker]}>
      {/* <Image
        source={{ uri: `data:image/gif;base64,${item.image}` }}
        style={{ width: 50, height: 50 }} 
      /> */}
      <Text>{markerIcon}</Text>
      {item?.label != undefined && <Text key={item.id}>{item?.label}</Text>}
    </View>);
  };

  return (
    <View style={styles.container}>
      {/* Map Container */}

      <Animated.Image
        {...mapPan.panHandlers}
        source={{ uri: map.Image }}
        style={[
          { width: map.width * mapZoom, height: map.height * mapZoom },
          { left: mapPos.x, top: mapPos.y },
          styles.mapImage]}
      />

      {map.markers.map(m => (<MapViewMarker
        key={m.id}
        marker={m}
        posLayout={GetAbsPosLayout(m, mapPos, mapZoom)}
        map={map} />))}


    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapImage: {
    position: 'absolute',
  },
  marker: {
    position: 'absolute',
  },
  mapContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 2
  },
});
