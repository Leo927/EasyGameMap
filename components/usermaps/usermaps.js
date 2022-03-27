import * as React from 'react';
import { View, FlatList, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EGMContext from '../../context';
import { getUserMaps } from '../../data/map';

export default function UserMaps(){
    const route = useRoute();

    const navigation = useNavigation();

    const context = React.useContext(EGMContext);

    // displayed maps. changed whenever params.uid changes.
    const [maps, setMaps] = React.useState([]);

    const onCreateMapPressed = ()=>{
        navigation.navigate("MapConfig");
    }
    
    // set maps on uid change
    React.useEffect(async ()=>{
        if(!route?.params?.uid)
            return;
        const result = await getUserMaps(route.params.uid);
        console.log(result);
        setMaps(result);
    }, [route.params.uid, route.params]);

    const renderMap = ({item, index})=>(
        <View>
            <Text>{item.name}</Text>
            <Text>{index}</Text>
        </View>
    );

    return(
        <View>
            {/* Only render create new map button when loggined and user id match map list id */}
            {context.user.uid && 
                (context.user.uid== route?.params?.uid) &&
                <Button title='Create New Map' onPress={onCreateMapPressed}/>}
            <View>
                <Text>Maps</Text>
                <FlatList
                    data={maps}
                    keyExtractor ={item=>item._id}
                    renderItem = {renderMap}
                />
            </View>
        </View>
    );
}