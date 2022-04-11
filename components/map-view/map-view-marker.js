/**
 * Markers on map. 
 */

import React from "react";
import { View, StyleSheet, Animated, Text, Image, TouchableOpacity, PanResponder } from "react-native";
import GetBuiltInIcons from "../../data/built-in-icons";

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
        tempIcon = map.customIcons.find(i=>i._id == marker.iconId);
      }
      else {// build in icon
        tempIcon = GetBuiltInIcons().find(i=>i._id == marker.iconId);
      }
    } catch (e) {
      tempIcon = GetBuiltInIcons()[0];
      return tempIcon;
    }
    if (!tempIcon) {
      tempIcon = GetBuiltInIcons()[0];
    }
    return tempIcon;
  }

  return (
    <View
      key={marker._id}
      style={[
        posLayout,
        styles.marker]}>
      <TouchableOpacity
        onPress={()=>onPress(marker)}
      >        
        <Text
          style={styles.markerImage}>
          {getIcon()&&getIcon().image}
        </Text>
      </TouchableOpacity>
      {marker?.label != undefined &&
        <Text style={styles.label}>{marker?.label}</Text>
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
    fontSize: 35
  },
  label: {
    textAlign: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.4)',
    borderRadius: 2,
    color: 'white',
  }
})