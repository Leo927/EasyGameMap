import React from 'react';
import { View, StyleSheet } from 'react-native';

import EgmMapView from "../map-view/map-view";
import { getMap } from '../../data/map';

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