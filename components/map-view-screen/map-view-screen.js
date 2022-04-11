import React from 'react';
import { View, StyleSheet } from 'react-native';

import EgmMapView from "../map-view/map-view";
import { getMap } from '../../data/map';

/**
 * It is a wrapper to EgmMapView that disable all editing.
 * Props: 
 * <1> route.mapId: should match a map._id.
 */
export default function MapViewScreen({route}){
  const [mapData, setMapData] = React.useState(undefined);

  /**
   * grab the actual map data whenever the route params change
   */
  React.useEffect(async ()=>{
    const {mapId} = route.params;
    if(!mapId)
      return;
    setMapData(await getMap(mapId));
  }, [route.params])

  return(
    <View style={styles.container}>
      {/* Render the map in non editable form*/}
      {mapData!=undefined&&
        <EgmMapView map={mapData} canEdit={false}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});