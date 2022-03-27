import * as React from 'react';
import { View, Switch, StyleSheet, Text, Button, TouchableOpacity, Picker, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EGMContext from '../../context';
import { useURL } from 'expo-linking';



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
    React.useEffect(()=>{
        if(route?.params?.mapId)
            setMap(await getMap(route.params.mapId));
        else
            setMap(new Map());
    },[route.params])

    //get the data representing the current map
    const getMapData = ()=>{
        const map = {};
        map.name = mapName;
        if(customMapSize){
            map.width = mapWidth;
            map.height = mapHeight;
        }
        else{
            // infer map size here
        }
        map.markerGroups = markerGroups;
        return map;
    }

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
                    
                    <TextEntry 
                        style= {styles.row}
                        label ="Name"
                        description="Displayed map name"
                        placeholder = "Enter name"
                        onValueChange = {setMapName}
                        isValidInput={(value)=>value}
                        errorText="Map name cannot be empty"/>
                    

                    <View style={styles.entry}>
                        <Text>Define Custom Map Size</Text>
                        <Switch
                            value={customMapSize}
                            onValueChange={setCustomMapSize}
                        ></Switch>
                    </View>

                    {customMapSize&&<TextEntry 
                        style={styles.row}
                        label ="Width"
                        description="horizontal dimension"
                        placeholder = "Enter width"
                        onValueChange = {setMapWidth}
                        isValidInput={(value)=>!isNaN(value) && value > 0}
                        errorText="Map width must be a number."/>
                    }

                    {customMapSize&&<TextEntry 
                        style={styles.row}
                        label ="Height"
                        description="Vertical dimension"
                        placeholder = "Enter height"
                        onValueChange = {setMapHeight}
                        isValidInput={(value)=>!isNaN(value) && value > 0}
                        errorText="Map width must be a number."/>
                    }

                    <View style={styles.row}>
                        <Text>Icon Groups</Text>
                    </View>


                    <Button
                        style = {styles.row}
                        title={mapId?"Update":"Create"}
                        onPress={onCreatePressed}
                    />

                    {mapId != undefined && 
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
    },
    entry: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row:{
        marginBottom: 10,
    },
    
});