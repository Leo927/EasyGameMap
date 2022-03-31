/**
 * Markers on map. 
 */

import React from "react";
import { View, StyleSheet, Animated, Text, Image, TouchableOpacity, PanResponder } from "react-native";
import Marker from '../../classes/marker';

/**
 * Props: 
 * <1> marker: Marker instance. 
 * <2> mapPos: Aniamted.ValueXY. represent the current map position
 * <3> posLayout: {left, top} 
 */
export default function MapViewMarker({ marker, map, posLayout, onPress }) {
  const markerPan = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (e, g) => {
    }
  })

  /**
   * get the displayed icon.
   * 
   * Preconditions:
   * <1> marker is defined and conform to Marker class
   * <2> GetBuiltInIcons returns a dictionary of string, icon pair. 
   *      The icon should be string representation of gif images. 
   * 
   * Returns: string representationf of the icon.
   * 
   */
  const getIcon = () => {
    // get marker icon either from build in or from custom
    var tempIcon;
    try {
      if (marker.isCustomIcon) {//custom icon
        tempIcon = map.customIcons[marker.iconId];
      }
      else {// build in icon
        tempIcon = GetBuiltInIcons()[marker.iconId];
      }
    } catch (e) {
      console.error(`Failed to set icon. ${e}`);
    }
    if (!tempIcon) {
      console.error(`Invalid marker icon`, tempIcon, marker);
      return;
    }
    return tempIcon;
  }

  return (
    <View
      key={marker.id}
      style={[
        posLayout,
        styles.marker]}>
      <TouchableOpacity
        onPress={()=>onPress(marker)}
      >        
        <Image
          style={styles.markerImage}
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Full_Star_Yellow.svg/64px-Full_Star_Yellow.svg.png?20061109100643' }} />

      </TouchableOpacity>
      {marker?.label != undefined &&
        <Text style={styles.label} key={marker.id}>{marker?.label}</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
  },
  markerImage: {
    width: 50,
    height: 50,
  },
  label: {
    textAlign: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.4)',
    borderRadius: 2,
    color: 'white',
  }
})