import * as React from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import { Button, Text, Dialog, Portal, TextInput, HelperText, Card, Title} from 'react-native-paper';

export default function MapConfigMarker({ map, setMap }) {
  const [addGroupDiagVisible, setAddGroupDiagVisible] = React.useState(false);

  const [newGroupName, setNewGroupName] = React.useState("");

  const [newGroupStarted, setNewGroupStarted] = React.useState(false);

  // usd for displaying error msg when adding new marker group. 
  const [errMsg, setErrMsg]  = React.useState("");

  const onAddGroupDismissed = ()=>{
    setNewGroupName("");
    setNewGroupStarted(false);
    setAddGroupDiagVisible(false);
  };

  const checkNewGroupName =()=>{
    if(newGroupName.length > 0)
      setNewGroupStarted(true);
    if(map.markerGroups.includes(newGroupName)){
      setErrMsg("Duplicate group name is not allowed");
      return false;
    }
    
    if(!newGroupName){
      setErrMsg("Must not be empty");
      return false;
    }

    setErrMsg("");
    return true;
  }

  // check the group name for error
  React.useEffect(()=>{
    checkNewGroupName();
  },[newGroupName])

  /**
   * Handles adding a new group to the marker groups of the map
   */
  const onAddGroup = ()=>{
    try{
      if(!map || !setMap)
        throw "Map or setMap not defined"
      // init marker groups if not already exists
      if(!map.markerGroups)
        setMap({...map, markerGroups:[]})

      if(!Array.isArray(map.markerGroups))
        throw "Invalid markerGroups type. Expected Array";

      if(!checkNewGroupName())
        return;
      
      setNewGroupStarted(false);
      setNewGroupName("");
      map.markerGroups.push(newGroupName);
    }catch(e){
      console.error(`Failed to create marker group. ${e}`);
    }
    setAddGroupDiagVisible(false);
  }

  /**
   * Returns a JSX element representing a marker group
   * Keyword Arguments:
   * <1>  item: string. name of the marker group.
   * Returns:
   * JSX element.
   */
  const renderMarkerGroup = ({item, index})=>(
    <Card>
      <Card.Title title={item}/>
      <Card.Actions>
        <Button>Edit</Button>
        <Button onPress={()=>{          
          map.markerGroups = map.markerGroups.filter(i=>i!=item);
          }}>Delete</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>

      {/* Add marker group dialogue box */}
      <Portal>
        <Dialog visible={addGroupDiagVisible} onDismiss={onAddGroupDismissed}>
          <Dialog.Title>Add Marker Group</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Marker Group Name"
              value={newGroupName}
              error={!newGroupName && newGroupStarted}
              onChangeText={setNewGroupName}>
            </TextInput>
            <HelperText type='error' visible={newGroupStarted && errMsg.length>0}>
              {errMsg}
            </HelperText>
            
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onAddGroup}>Add</Button>
            <Button onPress={()=>setAddGroupDiagVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      
      <Button 
        mode='outlined'
        onPress={()=>setAddGroupDiagVisible(true)}
        >Add Marker Group</Button>

      {/* Render diaglogue boxes */}
      <FlatList
        data={map.markerGroups}
        extraData={map}
        keyExtractor={(v, i)=>i.toString()}
        renderItem={renderMarkerGroup}
      ></FlatList>
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