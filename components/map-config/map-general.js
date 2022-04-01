import * as React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import EGMContext from '../../context';
import { TextInput, HelperText, Button, Text, Title, List } from 'react-native-paper';
import { createMap, updateMap } from '../../data/map';


import MapConfigMarker from './map-marker';
import { useNavigation } from '@react-navigation/native';

export default function MapConfigGeneral({ map, setMap }) {

  const context = React.useContext(EGMContext);

  const [saveMsg, setSaveMsg] = React.useState("");

  /**
   * Update or Insert a map depending on whether the map has valid _id. 
   * 
   * Precondtions:
   * <1> map must be valid
   * <2> server must be responding
   * 
   * Side Effects:
   * <1> The map is either inserted or updated on the server side. 
   * <2> An alert will show up on successful saving.
   * 
   */
  const SaveMap = async () => {
    try {
      if (map._id) { // update map
        try {
          const res = await updateMap(map._id, map, context.user);
          setSaveMsg(`Map Updated at ${new Date().getHours()}: ${new Date().getMinutes()}`);
        } catch (e) {
          console.error(e);
        }
      }
      else { // create new map
        try {
          const res = await createMap(map, context.user);
          setMap((m) => ({ ...m, _id: res?.mapId }));
          setSaveMsg(`Map Created at ${new Date().getHours()}: ${new Date().getMinutes()}`);
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(`Failed to save map.` + e);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={map.name}
        placeholder="Enter name"
        error={!map.name}
        onChangeText={(value) => setMap((current) => ({ ...current, name: value }))}
      />
      <MapConfigMarker map={map} setMap={setMap} />
      <Button mode='outlined' onPress={SaveMap}>Save</Button>
      <HelperText visible={saveMsg} type='info'>{saveMsg}</HelperText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 20,
  },
});