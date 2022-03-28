import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import EGMContext from '../../context';
import { TextInput, HelperText, Button, Text, Title, List } from 'react-native-paper';
import { createMap, updateMap } from '../../data/map';

export default function MapConfigGeneral({map, setMap}){
    const context = React.useContext(EGMContext);

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
    return(
        <View style={styles.container}>
            <View>
                <TextInput
                    label="Name"
                    value={map.name}
                    placeholder = "Enter name"
                    error = {(value)=>!value.name}
                    onChangeText = {(value)=>setMap((current)=>({...current, name:value}))}
                />

                <Button
                    style={styles.row}
                    mode={'outlined'}
                    onPress={onCreatePressed}>
                    {map._id != "" ? "Update" : "Create"}
                </Button>

                
                {map._id != "" &&
                    <Button mode='outlined'>View Map</Button>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: 20,
    },
});