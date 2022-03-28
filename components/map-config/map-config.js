import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EGMContext from '../../context';
import { Button, Text, Title, List } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



import { updateMap, createMap } from '../../data/map';
import { Map } from '../../classes/map';
import { getMap } from '../../data/map';
import MapConfigGeneral from './map-general';
import MapConfigImage from './map-image';
import MapConfigMarker from './map-marker';

const Tab = createMaterialBottomTabNavigator();

export default function MapConfigStack() {

  const route = useRoute();

  const context = React.useContext(EGMContext);

  const [map, setMap] = React.useState(new Map());

  // on start, set map id from route params
  React.useEffect(async () => {
    if (!route?.params?.mapId)
      return;
    var tempMap = await getMap(route.params.mapId);
    if (!tempMap) {
      setMap(new Map());
      return;
    }
    setMap(tempMap);
  }, [route.params])

  const onCreatePressed = async () => {
    if (map._id) {
      try {
        const res = await updateMap(map._id, map, context.user);
      } catch (e) {
        console.error(e);
      }
    }
    else {
      try {
        const res = await createMap(map, context.user);
        setMap((m) => ({ ...m, _id: res?.mapId }));
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
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
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),

        }}>
        {() => (<MapConfigImage map={map} setMap={setMap} />)}
      </Tab.Screen>

      <Tab.Screen
        name="Markers"
        title="Markers"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),

        }}>
        {() => (<MapConfigMarker map={map} setMap={setMap} />)}
      </Tab.Screen>
    </Tab.Navigator>
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