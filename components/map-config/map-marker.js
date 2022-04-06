import * as React from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import { Button, Text, Dialog, Portal, TextInput, HelperText, Card, Title} from 'react-native-paper';

import IconDetail from '../icon-detail/icon-detail';
import Icon from '../../classes/icon';
import uuid from 'react-native-uuid';

export default function MapConfigMarker({ map, setMap }) {
  const [addGroupDiagVisible, setAddGroupDiagVisible] = React.useState(false);

  const [newGroupName, setNewGroupName] = React.useState("");

  const [newGroupStarted, setNewGroupStarted] = React.useState(false);

  const [editingIcon, setEditingIcon] = React.useState(new Icon());

  // usd for displaying error msg when adding new marker group. 
  const [errMsg, setErrMsg]  = React.useState("");
  
  // used for displying icon detail modal.
  const [iconDiagVisible, setIconDiagVisible] = React.useState(false);

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

  // invoked when Add Custom Icon Button is hit
  const onAddCustIconButtonClicked = ()=>{
    setEditingIcon(new Icon());
    setIconDiagVisible(true);
  }

  // invoked when icon detail dialogue is confirmed. 
  const onIconEditConfirmed = async ()=>{
    try{ 
      const foundId = map.customIcons.findIndex(i=>i._id == editingIcon._id);     
      if(foundId <0){//create new icon
        // check duplicate name
        const sameNames = map.customIcons.filter(i=>i.name == editingIcon.name);
        if(sameNames.length > 0)
          return;
        const id = uuid.v1();
        editingIcon._id = id;
        map.customIcons.push(editingIcon);
        console.log(map.customIcons, editingIcon);
        setIconDiagVisible(false);
      }
      else{//edit existing icon
        // check duplicate name
        const sameNames = map.customIcons.filter(i=>i.name == editingIcon.name);
        if(sameNames.length > 1)
          return;
        var copy = map.customIcons;
        copy[foundId] = editingIcon;
        setMap({...map, customIcons:copy});
        setIconDiagVisible(false);
      }
    }catch(e){
      console.error(`Failed to edit icon. ${e}`);
    }
  }

  // invoked when icon detail dialogue is cancelled. 
  const onIconEditCancelled = ()=>{
    setIconDiagVisible(false);
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
          map.markerGroups.splice(index, 1);
          }}>Delete</Button>
      </Card.Actions>
    </Card>
  );

  /**
   * Returns a card representing the icon.
   * Props: 
   *  item: the icon
   *  index: the index of the icon in the list.
   */
  const renderIconCard = ({item, index})=>{
    return (<Card>
      <Card.Title title={item.name}/>
      <Card.Content>
        {/* Show the image */}
        <Image 
          style={styles.iconImage}
          source={{ uri: `data:image/gif;base64,${item.image}` }}/>
      </Card.Content>
      <Card.Actions>
        <Button onPress={()=>{
          setEditingIcon(item);
          setIconDiagVisible(true);
        }}>Edit</Button>
        <Button onPress={()=>{          
          map.customIcons.splice(index, 1);
          }}>Delete</Button>
      </Card.Actions>
    </Card>
  )};

  return (
    <View>

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

      {/* Display all markers groups*/}
      <FlatList
        data={map.markerGroups}
        extraData={map}
        keyExtractor={(v, i)=>i.toString()}
        renderItem={renderMarkerGroup}
      ></FlatList>

      {/* IconDetail Dialog  */}
      <IconDetail visible={iconDiagVisible}
        setVisible={setIconDiagVisible}
        icon={editingIcon}
        setIcon={setEditingIcon}
        onConfirm={onIconEditConfirmed}
        onCancel={onIconEditCancelled}/>

      {/* Button To add new icon */}
      <Button mode='outlined' onPress={onAddCustIconButtonClicked}>Add Custom Icon</Button>

      {/* Display all custom icons */}
      <FlatList
        data={map.customIcons}
        extraData={map}
        keyExtractor={i=>i._id}
        renderItem={renderIconCard}
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

  iconImage:{
    width:30,
    height:30,
  }
});