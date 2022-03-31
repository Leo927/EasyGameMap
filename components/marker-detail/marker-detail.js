/**
 * Implements a marker detail dialog
 */

import React from 'react';
import { StyleSheet, View, Picker } from 'react-native';
import { Dialog, Text, Button, TextInput, Portal, Switch } from 'react-native-paper';

import GetBuiltInIcons from '../../data/built-in-icons';

/**
 * 
 * Props:
 * <1> visible: bool. whether the dialog is visible
 * <2> setVisible: set the visible. 
 * <3> marker: the data to display
 * <4> setMarker: setter of the marker.
 * <5> onDismiss: called when dimissed 
 * <6> onDelete: called when Delete is pressed
 * <7> isEdit: whether in edit mode. Editings are disabled when in edit mode.
 * <8> map: the map data
 * @returns 
 */
export default function MarkerDetail({ visible,
  setVisible,
  marker,
  setMarker,
  onDismiss,
  onDelete,
  isEdit,
  map }) {
  return (
    <Portal>
      {marker &&
        <Dialog
          visible={visible}
          onDismiss={onDismiss}
        >
          <Dialog.Title>
            {marker.title}
          </Dialog.Title>
          <Dialog.Content>
            <Text> {!isEdit && marker.description}</Text>
            {isEdit &&
              <View
                style={styles.row}>
                <TextInput
                  style={{ flex: 1 }}
                  label="Title"
                  placeholder='Enter Title'
                  value={marker.title}
                  onChangeText={(t) => setMarker({ ...marker, title: t })}
                />
                <TextInput
                  label="Label"
                  placeholder='Enter Icon.'                  
                  style={{ flex: 1 }}
                  value={marker.label}
                  onChangeText={(t) => setMarker({ ...marker, label: t })}
                />
              </View>}

            {isEdit &&
              <TextInput
                label="Description"
                multiline={true}
                value={marker.description}
                onChangeText={(t) => setMarker({ ...marker, description: t })}
              />}
            {isEdit &&
              <View style={styles.row}>
                <TextInput
                  style={{ flex: 1 }}
                  label="x"
                  value={marker.left}
                  onChangeText={(t) => setMarker({ ...marker, left: t })}
                />
                <TextInput
                  style={{ flex: 1 }}
                  label="y"
                  value={marker.top}
                  onChangeText={(t) => setMarker({ ...marker, top: t })}
                />
              </View>}

            {isEdit &&
              <View style={styles.row}>
                <Text>Use Custom Icon</Text>
                <Switch
                  value={marker.isCustomIcon}
                  onValueChange={(v) => {
                    setMarker({ ...marker, isCustomIcon: v })
                  }} />
              </View>
            }

            {isEdit && marker.isCustomIcon &&
              <View style={styles.row}>
                <Text>Select A Custom Icon</Text>
                <Picker
                  selectedValue={marker.iconId}
                  onValueChange={(itemValue, itemIndex) =>
                    setMarker({ ...marker, iconId: itemValue })
                  }>
                  {map.customIcons.map(i => (
                    <Picker.Item key={i._id} label={i.name} value={i._id} />
                  ))}
                </Picker>
              </View>
            }

            {isEdit && !marker.isCustomIcon &&
              <View style={styles.row}>
                <Text>Select A Default Icon</Text>
                <Picker
                  selectedValue={marker.iconId}
                  onValueChange={(itemValue, itemIndex) =>
                    setMarker({ ...marker, iconId: itemValue })
                  }>
                  {GetBuiltInIcons().map(i => (
                    <Picker.Item key={i._id} label={i.name} value={i._id} />
                  ))}
                </Picker>
              </View>
            }

          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onDismiss}>Confirm</Button>
            {isEdit &&
              <Button onPress={() => onDelete(marker)}>Delete</Button>}
          </Dialog.Actions>
        </Dialog>
      }
    </Portal>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})