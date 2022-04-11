import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

/**
 * A page used to configure the image related afairs of a map.
 * @prop
 * <1> map: map Data
 * <2> setMap: setter of map
 */
export default function MapConfigImage({ map, setMap }) {

  /**
   * Pick an image for the icon. 
   */
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await DocumentPicker.getDocumentAsync({
      type: 'image/*'
    })
    let imgString = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    })
    setMap((c) => ({ ...c, image: imgString }));
    Image.getSize(`data:image/gif;base64,${imgString}`, (width, height) => {
      setMap(c => ({ ...c, width, height }));
    })
  };

  return (
    <View style={styles.container}>
      <View>

        <Button mode='outlined' onPress={pickImage}>Pick Image</Button>

        {/* Only show the image and related input when image is uploaded */}
        {map.image != undefined &&
          map.image.length > 0 && 
          <View>
            {/* Show image */}
            <Image
              source={{ uri: `data:image/gif;base64,${map.image}` }}
              style={{ width: 100, height: 100 }} />

            {/* Defined the width of the image */}
            <TextInput
              label="Width"
              value={map.width + ""}
              placeholder="Enter width"
              error={isNaN(map.width) || (map.width + "").length <= 0}
              onChangeText={(value) => setMap((current) => ({ ...current, width: value }))}
            >
            </TextInput>

            {/* Defined the height of the image */}
            <TextInput
              label="Height"
              value={map.height + ""}
              placeholder="Enter height"
              error={isNaN(map.height) || (map.height + "").length <= 0}
              onChangeText={(value) => setMap((current) => ({ ...current, height: value }))}
            />
          </View>}
      </View>
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