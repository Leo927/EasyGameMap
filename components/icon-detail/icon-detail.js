import { View, Image } from 'react-native'
import { Text,Dialog, Portal, TextInput, Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function IconDetail({visible, setVisible, icon, setIcon, onConfirm, onCancel}){

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await DocumentPicker.getDocumentAsync({
      type: 'image/*'
    })
    let imgString = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    })
    setIcon({ ...icon, image: imgString });
  };

  return(
    <Portal>
      <Dialog visible={visible} onDismiss={()=>setVisible(false)}>
        <Dialog.Title>Icon</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Name"
            value={icon.name}
            onChangeText = {value=>setIcon({...icon, name:value})}
            error={!icon.name}
          />
          {icon.image != undefined &&
          icon.image.length > 0 && 
            <Image
                source={{ uri: `data:image/gif;base64,${icon.image}` }}
                style={{ width: 30, height: 30 }} />}
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