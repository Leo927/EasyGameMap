import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EGMContext from '../../context';
import { useURL } from 'expo-linking';
import * as ImagePicker from 'expo-image-picker';
import { Card, TextInput, Divider, Button, Text, Title } from 'react-native-paper';



import { updateMap, createMap } from '../../data/map';
import TextEntry from '../text-input/text-input';
import PullToRefreshViewNativeComponent from 'react-native/Libraries/Components/RefreshControl/PullToRefreshViewNativeComponent';
import { Map } from '../../classes/map';
import { getMap } from '../../data/map';

export default function MapConfig(){
    const route = useRoute();

    const context = React.useContext(EGMContext);

    const [map, setMap] = React.useState(new Map());

    
    const [image, setImage] = React.useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.cancelled) {
        setImage(result.uri);
        }
    };

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
    },[route.params])

    const onCreatePressed = async ()=>{
        if(map._id)
        {
            const res = await updateMap(map._id, map, context.user);
            console.log(res);
        }
        else{
            const res = await createMap(map, context.user);
            setMap((m)=>({...m, _id:res?.mapId}));
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

                    <Divider/>
                    
                    <TextInput
                        label="Width"
                        value={map.width+''}
                        placeholder = "Enter name"
                        error = {(value)=>{isNaN(value)}}
                        onChangeText = {(value)=>setMap((current)=>({...current, width:value}))}
                    />


                    <Button
                        style = {styles.row}
                        mode = {'outlined'}
                        onPress={onCreatePressed}>
                        {map._id != ""?"Update":"Create"}
                    </Button>

                    {map._id != "" && 
                        <Button 
                            title='View Map'
                            style = {styles.row}
                        />    
                    }

                    
            
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    <Button onPress={pickImage}>Pick Image</Button>
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