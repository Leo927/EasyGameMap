/**
 * Implements a pure react native map view. 
 */
import React from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Image,
} from 'react-native';
import { Button, Switch, Text } from 'react-native-paper';


// used to generate new id
// These ids only need to be unique within the same map. 
// It is very unlikely to have a collision.
import uuid from 'react-native-uuid';

import GetBuiltInIcons from '../../data/built-in-icons';
import MapViewMarker from './map-view-marker';
import MarkerDetail from '../marker-detail/marker-detail';
import Marker from '../../classes/marker';
import Icon from '../../classes/icon';


const customIcon = Icon.create('smile', '😀');

export default function EgmMapView({ map, setMap, canEdit }) {
  // get screen dimension
  const [containerSize, setContainerSize] = React.useState({ x: 100, y: 100 });

  // controls the position of the top left corner of the map 
  // from the top left corner of the parent
  const [mapPos, setMapPos] = React.useState({ x: 0, y: 0 });
  // controls the zoom level of the map
  const [mapZoom, setMapZoom] = React.useState(1);

  // controls the marker detail dialog visibility
  const [markerDetailVisible, setMarkerDetailVisible] = React.useState(false);

  // stores the marker that is being edited
  const [editingMarker, setEditingMarker] = React.useState(null);

  // some functions are only avialble in edit mode
  const [isEdit, setIsEdit] = React.useState(false);

  // left for potential dynamic swapping
  const iconSize = { x: 50, y: 50 }
  // control map panning
  const mapPan = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (e, g) => {
      // change mapPos
      setMapPos((current) => ({
        x: current.x + g.dx,
        y: current.y + g.dy
      }));
    }
  })

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

  /**
   * Get the absolute screen position from a relative map position
   *   
   * @param {{x,y}} mapXY the position of something on the map
   * 
   * Preconditions:
   * <1> mapPos must be valid
   * <2> mapZoom must be valid
   * 
   * @returns The position of the item on the screen
   */
  function mapXYToScreenXY(mapXY) {
    const absPosX = mapPos.x + mapXY.x * mapZoom;
    const absPosY = mapPos.y + mapXY.y * mapZoom;
    return { x: absPosX, y: absPosY }
  }

  /**
   * Get the relative map position from the absolute screen position.
   * @param {{x, y}} screenXY 
   * Preconditions:
   * <1> mapPos must be valid
   * <2> mapZoom must be valid
   * 
   * @returns The position of the item on the map
   */
  function screenXYtoMapXY(screenXY) {
    const mapX = (screenXY.x - mapPos.x) / mapZoom;
    const mapY = (screenXY.y - mapPos.y) / mapZoom;
    return { x: mapX, y: mapY }
  }

  /**
   * Handle marker pressed event
   * @param {Marker} marker 
   * 
   * Side Effects:
   * <1> open marker pressed dialog
   * <2> set editing marker to the given marker
   * 
   * Returns:
   * None
   */
  function onMarkerPressed(marker) {
    setEditingMarker(marker);
    setMarkerDetailVisible(true);
  }

  /**
   * Handle create new marker. Place the new marker at the center of the screen.
   * 
   * SideEffects:
   * <1> map is updated.
   */
  function createNewMarker() {
    if (!setMap)
      return;
    setMap(currentMap => {
      const newMarker = new Marker();
      // get absolute screen center
      const centerOfScreen = { x: containerSize.x / 2, y: containerSize.y / 2 };

      // convert to map relative position
      const mapRelativePos = screenXYtoMapXY(centerOfScreen);

      // keep one decimal
      newMarker.left = Math.round(mapRelativePos.x * 10) / 10;

      // keeps one decimal
      newMarker.top = Math.round(mapRelativePos.y * 10) / 10;

      setEditingMarker(newMarker);
      setMarkerDetailVisible(true);

      currentMap.markers.push(newMarker);
      return { ...currentMap };
    });
  }

  /**
   * @description
   * Handle marker delete
   * 
   * @param {Marker} marker the marker to delete
   * 
   * Side Effects:
   * <1> marker is removed from the map
   */
  function onMarkerDeleted(marker) {
    if (!setMap)
      return;
    setMap(currentMap => {
      const idx = currentMap.markers.findIndex(m => m._id == editingMarker._id);
      if (idx >= 0)
        currentMap.markers.splice(idx, 1);
      return currentMap;
    });
    setMarkerDetailVisible(false);
  }

  /**
   * Merge the changes from editingMarker into the map
   */
  function mergeEditingMarker() {
    if (!editingMarker)
      return;
    if (!setMap)
      return;
    setMap(currentMap => {
      const idx = currentMap.markers.findIndex(m => m._id == editingMarker._id);
      if (idx < 0)
        return currentMap;
      currentMap.markers.splice(idx, 1);
      currentMap.markers.push(editingMarker);
      return currentMap;
    });
  }

  React.useEffect(() => {
    mergeEditingMarker();
  }
    , [editingMarker])

  return (
    <View style={styles.container}
      onLayout={(e) => {
        // save component size
        var { x, y, width, height } = e.nativeEvent.layout;
        setContainerSize({ x: width, y: height });
      }}>
      {/* Map Container */}

      <Image
        {...mapPan.panHandlers}
        source={{ uri: `data:image/gif;base64,${map.image}` }}
        style={[
          { width: map.width * mapZoom, height: map.height * mapZoom },
          { left: mapPos.x, top: mapPos.y },
          styles.mapImage]}
      />
      <MarkerDetail
        visible={markerDetailVisible}
        setVisible={setMarkerDetailVisible}
        marker={editingMarker}
        setMarker={setEditingMarker}
        onDismiss={() => setMarkerDetailVisible(false)}
        onDelete={onMarkerDeleted}
        isEdit={isEdit}
        map={map}
      />
      {map.markers.map(m => (<MapViewMarker
        key={m._id}
        marker={m}
        posLayout={GetAbsPosLayout(m)}
        map={map}
        onPress={onMarkerPressed}
      />))}

      {/* EditMode Toggle */}
      {canEdit &&
        <View
          style={styles.editModeToggle}>

          <Text style={styles.onMapText}>EditMode</Text>
          <Switch
            value={isEdit}
            onValueChange={setIsEdit}
          />
        </View>
      }

      {/* ToolBox */}
      {isEdit &&
        <View style={styles.toolbox}>
          <Button mode='outlined' onPress={createNewMarker}>New Marker</Button>
        </View>
      }
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
  editModeToggle: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 20,
    right: 20
  },
  toolbox: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 2,
    padding: 2,
    top: 100,
    right: 20
  },
  onMapText: {
    backgroundColor: 'rgba(20, 20, 20, 0.5)',
    color: 'white',
    padding: 2,
    borderRadius: 2,
  }
});
