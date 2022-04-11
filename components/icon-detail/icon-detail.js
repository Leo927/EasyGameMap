import { View, Image } from 'react-native'
import { Text, Dialog, Portal, TextInput, Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

/**
 * 
 * Props:
 * <1> visible: bool to set the whether the dialog is displayed
 * <2> setVisible: setter for visible
 * <3> icon: icon data
 * <4> setIcon: setter for icon
 * <5> onConfirm: function to call on confirm
 * <6> onCancel: function to call on cancel
 * @returns 
 */
export default function IconDetail({ visible, setVisible, icon, setIcon, onConfirm, onCancel }) {

  /**
   * Prompt user to select an image and 
   * store the resulting image in icon.image
   */
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await DocumentPicker.getDocumentAsync({
      type: 'image/*'
    })
    // Cache the image as string. 
    // The image will be stored in the same document in noSQL.
    let imgString = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    })
    setIcon({ ...icon, image: imgString });
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>Icon</Dialog.Title>
        <Dialog.Content>

          {/* Input for Icon Name */}
          <TextInput
            label="Name"
            value={icon.name}
            onChangeText={value => setIcon({ ...icon, name: value })}
            error={!icon.name}
          />

          {/* Display the select icon image */}
          {icon.image != undefined &&
            icon.image.length > 0 &&
            <Image
              source={{ uri: `data:image/gif;base64,${icon.image}` }}
              style={{ width: 30, height: 30 }} />}

          {/* Button to select image */}
          <Button onPress={pickImage}>Select Image</Button>

        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={onConfirm}>Confirm</Button>
          <Button onPress={onCancel}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}