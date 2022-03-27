import * as React from 'react';
import { View, FlatList, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EGMContext from '../../context';

export default function UserMaps(){
    const route = useRoute();

    const navigation = useNavigation();

    const context = React.useContext(EGMContext);

    const onCreateMapPressed = ()=>{
        navigation.navigate("MapConfig");
    }

    // React.useEffect(()=>{
    //     if(context.user?.uname)
    //         console.log(`User Changed to ${context.user.uname}`);
    //     else
    //         console.log('User logged out. Should be guest');
    // }, [context.user])
    
    React.useEffect(()=>{
        if(route?.params?.uid)
            console.log(`Map page uid changed to ${route.params.uid}`);
    }, [route.params.uid, route.params]);

    return(
        <View>
            {/* Only render create new map button when loggined and user id match map list id */}
            {context.user.uid && 
                (context.user.uid== route?.params?.uid) &&
                <Button title='Create New Map' onPress={onCreateMapPressed}/>}
            <View>
                <Text>Maps goes here</Text>
            </View>
        </View>
    );
}