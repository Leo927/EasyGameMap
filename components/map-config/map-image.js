import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EGMContext from '../../context';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, HelperText, Button, Text, Title, List } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function MapConfigImage({map, setMap}){


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await DocumentPicker.getDocumentAsync({
            type:'image/*'
        })
        let imgString = await FileSystem.readAsStringAsync(result.uri, {
            encoding: FileSystem.EncodingType.Base64,
        })
        setMap({...map, image:imgString});
    };

    return(
        <View style={styles.container}>
            <View>
                
                <Button mode='outlined' onPress={pickImage}>Pick Image</Button>

                {map.image != undefined &&
                map.image.length > 0 && <View>
                    <Image 
                        source={{uri: `data:image/gif;base64,${map.image}`}}
                        style={{ width: 100, height: 100 }} />
                    
                    <TextInput
                        label="Width"
                        value={map.width+""}
                        placeholder = "Enter width"
                        error = {(value)=>isNaN(value)}
                        onChangeText = {(value)=>setMap((current)=>({...current, width:value}))}
                    >
                    </TextInput>

                    <TextInput
                        label="Height"
                        value={map.height+""}
                        placeholder = "Enter height"
                        error = {(value)=>isNaN(value)}
                        onChangeText = {(value)=>setMap((current)=>({...current, height:value}))}
                    />
                </View>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: 20,
    },
});