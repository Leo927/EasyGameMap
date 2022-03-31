/**
 * Implements a marker detail dialog
 */

import React from 'react';
import { Dialog, Text, Button, TextInput, Portal } from 'react-native-paper';


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
 * @returns 
 */
export default function MarkerDetail({ visible,
  setVisible,
  marker,
  setMarker,
  onDismiss,
  onDelete,
  isEdit }) {
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
              <TextInput
                label="Title"
                value={marker.title}
                onChangeText={(t) => setMarker({ ...marker, title: t })}
              />}
            {isEdit &&
              <TextInput
                label="Label"
                value={marker.label}
                onChangeText={(t) => setMarker({ ...marker, label: t })}
              />}
            {isEdit &&
              <TextInput
                label="Description"
                value={marker.description}
                onChangeText={(t) => setMarker({ ...marker, description: t })}
              />}
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