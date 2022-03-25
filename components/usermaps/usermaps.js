import * as React from 'react';
import { View, Pressable, StyleSheet, Text, Button, TouchableOpacity, Picker, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EGMContext from '../../context';

export default function UserMaps(){
    const route = useRoute();

    const navigation = useNavigation();

    const context = React.useContext(EGMContext);

    const { uid } = route.params;

    const onCreateMapPressed = ()=>{
        navigation.navigate("MapConfig", {mapId: "Place holder map id"});
    }

    return(
        <View>
            {context.uid== uid &&
            <Button title='Create New Map' onPress={onCreateMapPressed}/>}
            <View>
                <Text>Maps goes here</Text>
            </View>
        </View>
    );
}