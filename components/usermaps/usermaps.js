import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EGMContext from '../../context';
import { getUserMaps, deleteMap, updateMap } from '../../data/map';
import { Card, Button, Text, Title, Portal, Dialog, Provider, Paragraph } from 'react-native-paper';

export default function UserMaps({uid}){
    const navigation = useNavigation();

    const [delVisible, setDelVisible] = React.useState(false);

    const [delAction, setDelAction] = React.useState(()=>{});

    const [delTarget, setDelTarget] = React.useState(null);

    const context = React.useContext(EGMContext);

    // displayed maps. changed whenever params.uid changes.
    const [maps, setMaps] = React.useState([]);

    const onCreateMapPressed = ()=>{
        navigation.navigate("MapConfig");
    }

    // update maps when loading
    const updateMaps = async ()=>{
        if(!uid)
            return;
        try{
            setMaps(await getUserMaps(uid));
        }catch(e){
            console.error(e);
        }
    };



    React.useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', updateMaps);
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation])

    const renderMap = ({item, index})=>{
        return(
        <Card style={styles.mapCard}>
            <Card.Title title={item.name}/>
            <Card.Actions>
                <Button onPress={()=>navigation.navigate("MapConfig", {mapId: item._id})}>Config</Button>
                <Button>Open</Button>
                <Button onPress={()=>{
                    setDelVisible(true);
                    setDelTarget(item._id);
                }}>Delete</Button>
            </Card.Actions>
        </Card>);
    };

    return(
        <View style={styles.container}>
            <Portal>
                <Dialog visible = {delVisible} onDismiss={()=>setDelVisible(false)}>
                    <Dialog.Title>Delete Map</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Are you sure you want to delete the map?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>{
                            deleteMap(delTarget, context.user)
                            .then((res)=>{
                                if(res.deletedCount){
                                    setMaps(maps.filter(m=>m._id != delTarget))                                    
                                }
                                setDelVisible(false);                                
                            })
                            .catch((e)=>{
                                console.error(e);
                            })
                        }}>Confirm</Button>
                        <Button onPress={()=>setDelVisible(false)}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            {/* Only render create new map button when loggined and user id match map list id */}
            {context.user?.uid && 
                (context.user.uid== uid) &&
                <Button mode="outlined" onPress={onCreateMapPressed}>Create New Map</Button>}
            <View>
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