import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import EGMContext from '../../context';
import { getUserMaps, deleteMap, updateMap } from '../../data/map';
import { Card, Button, Text, Title, Portal, Dialog, Provider, Paragraph } from 'react-native-paper';
import MapCard from '../map-card/map-card';

/**
 * Implements a page to display user maps. 
 * 
 * @param {*} param0 
 * @returns 
 */
export default function UserMaps({uid}){
    const navigation = useNavigation();

    // control whether the delete dialog is visible
    const [delVisible, setDelVisible] = React.useState(false);

    // store the delete target. Should be a mapId
    const [delTarget, setDelTarget] = React.useState(null);

    // global context
    const context = React.useContext(EGMContext);

    // displayed maps. changed whenever params.uid changes.
    const [maps, setMaps] = React.useState([]);

    const onCreateMapPressed = ()=>{
        navigation.navigate("MapConfigStack");
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

    useFocusEffect(React.useCallback(()=>{
      updateMaps();
    },[]));

    // handle pressing delete button on the map card
    function onDeletePressed(map){
      // set map as delete target
      setDelTarget(map._id);
      // set delete dialog visible
      setDelVisible(true);
    }
    
    // handle pressing confirm delete
    function onConfirmDeleteMap(){
      if(!delTarget)
        return;
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
  
    }


    return(
        <View style={styles.container}>

            {/* A delete confirmation dialog */}
            <Portal>
                <Dialog visible = {delVisible} onDismiss={()=>setDelVisible(false)}>
                    <Dialog.Title>Delete Map</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Are you sure you want to delete the map?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={onConfirmDeleteMap}>Confirm</Button>
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
                    renderItem = {({item, index})=>(
                      <MapCard canEdit={item.uid==context.user.uid} map={item} 
                        onDelete={()=>onDeletePressed(item)}/>)}
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