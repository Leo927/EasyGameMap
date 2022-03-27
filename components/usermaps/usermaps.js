import * as React from 'react';
import { View, FlatList, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EGMContext from '../../context';
import { getUserMaps } from '../../data/map';
import { Card } from 'react-native-paper';

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
        setMaps(result);
    }, [route.params.uid, route.params]);

    const renderMap = ({item, index})=>(
        <Card style={styles.mapCard}>
            <TouchableOpacity
                onPress={()=>navigation.navigate("MapConfig", {mapId: item._id})}
                >
                <Text style={styles.mapTitle}>{item.name}</Text>
            </TouchableOpacity>
        </Card>
    );

    return(
        <View style={styles.container}>
            {/* Only render create new map button when loggined and user id match map list id */}
            {context.user.uid && 
                (context.user.uid== route?.params?.uid) &&
                <Button title='Create New Map' onPress={onCreateMapPressed}/>}
            <View>
                <Text>Maps</Text>
                <FlatList
                    data={maps}
                    keyExtractor ={item=>item._id.toString()}
                    renderItem = {renderMap}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginLeft:'10%',
        marginRight: '10%',
    },
    mapCard:{
        marginTop: 10,
    },
    mapTitle:{
        fontSize: 18,
        margin: 5
    }
});