import * as React from 'react';
import { View, Switch, StyleSheet, Text, Button, TouchableOpacity, Picker, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EGMContext from '../../context';
import { useURL } from 'expo-linking';
import { Card, TextInput } from 'react-native-paper';



import { updateMap, createMap } from '../../data/map';
import TextEntry from '../text-input/text-input';
import PullToRefreshViewNativeComponent from 'react-native/Libraries/Components/RefreshControl/PullToRefreshViewNativeComponent';
import { Map } from '../../classes/map';
import { getMap } from '../../data/map';

export default function MapConfig(){
    const route = useRoute();

    const context = React.useContext(EGMContext);

    const [map, setMap] = React.useState(new Map());
    
    // map info states
    const [mapId, setMapId] = React.useState(undefined);

    const [mapName, setMapName] = React.useState("");

    const [mapWidth, setMapWidth] = React.useState(0);

    const [mapHeight, setMapHeight] = React.useState(0);

    const [markerGroups, setMarkerGroups] = React.useState([]);

    const [customMapSize, setCustomMapSize] = React.useState(false);

    // on start, set map id from route params
    React.useEffect(async ()=>{
        
        if(!route?.params?.mapId)
            return;
        var tempMap = await getMap(route.params.mapId);
        if(!tempMap) {
            setMap(new Map());
            return;
        }
        setMap(tempMap);
        console.log('map updated by params', {map});
    },[route.params])

    const onCreatePressed = async ()=>{
        if(mapId)
        {
            const res = await updateMap(mapId, getMapData(), context.user);
            console.log(res);
        }
        else{
            const res = await createMap(getMapData(), context.user);
            setMapId(res?.mapId);
            console.log(mapId);
        }
    }

    return(
        <View style={styles.container}>
            {/*Give error message if user isn't logged in.*/}
            {context?.user?.uid==undefined &&
                <Text>Guest cannot create maps.</Text>
            }
            {/*Only load when user is logged in */}
            {context?.user?.uid != undefined &&
                <View>
                    <TextInput
                        label="Name"
                        value={map.name}
                        placeholder = "Enter name"
                        error = {(value)=>{value.name}}
                        onChangeText = {(value)=>setMap((current)=>({...current, name:value}))}
                    />

                    <View style={styles.entry}>
                        <Text>Define Custom Map Size</Text>
                        <Switch
                            value={customMapSize}
                            onValueChange={setCustomMapSize}
                        ></Switch>
                    </View>
                    
                    <Card>
                        <Button 
                            title='Infer Map Size'
                        />

                        <TextEntry 
                            style={styles.row}
                            label ="Width"
                            description="horizontal dimension"
                            placeholder = "Enter width"
                            onValueChange = {setMapWidth}
                            isValidInput={(value)=>!isNaN(value) && value > 0}
                            errorText="Map width must be a number."/>

                        <TextEntry 
                            style={styles.row}
                            label ="Height"
                            description="Vertical dimension"
                            placeholder = "Enter height"
                            onValueChange = {setMapHeight}
                            isValidInput={(value)=>!isNaN(value) && value > 0}
                            errorText="Map width must be a number."/>
                    </Card>
                    <View style={styles.row}>
                        <Text>Icon Groups</Text>
                    </View>


                    <Button
                        style = {styles.row}
                        title={map._id != ""?"Update":"Create"}
                        onPress={onCreatePressed}
                    />

                    {map._id != "" && 
                        <Button 
                            title='View Map'
                            style = {styles.row}
                        />    
                    }
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 18
    },
    container:{
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: 20,
    },
    entry: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row:{
        marginBottom: 10,
    },
    
});