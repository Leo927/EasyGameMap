import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Map } from '../../classes/map';
import { getMap } from '../../data/map';
import MapConfigGeneral from './map-general';
import MapConfigImage from './map-image';
import EgmMapView from '../map-view/map-view';

const Tab = createMaterialBottomTabNavigator();

export default function MapConfigStack() {

  const route = useRoute();

  const [map, setMap] = React.useState();

  // on start, set map id from route params
  React.useEffect(async () => {
    if (!route?.params?.mapId)
      return;
    const tempMap = await getMap(route.params.mapId);
    if (!tempMap) {
      tempMap = new Map();
      return;
    }
    setMap(tempMap);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {map != undefined &&
        <Tab.Navigator
          barStyle={{
            backgroundColor: "white"
          }}
        >
          <Tab.Screen
            name="general"
            title="General"
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),

            }}>
            {() => (<MapConfigGeneral map={map} setMap={setMap} />)}
          </Tab.Screen>

          <Tab.Screen
            name="Underlay"
            title="Underlay"
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="image" color={color} size={26} />
              ),

            }}>
            {() => (<MapConfigImage map={map} setMap={setMap} />)}
          </Tab.Screen>

          <Tab.Screen
            name="Map"
            title="Map"
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="map" color={color} size={26} />
              ),

            }}>
            {() => (<EgmMapView map={map} setMap={setMap} canEdit={true} />)}
          </Tab.Screen>
        </Tab.Navigator>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 18
  },
  container: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 20,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  row: {
    marginBottom: 10,
  },

});