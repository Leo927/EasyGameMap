import * as React from 'react';
import { View, Pressable, StyleSheet, Text, Button, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EGMContext from '../../context';
import UserModal from '../usermodal/usermodal';

export default function NavBar(){
    const context = React.useContext(EGMContext);

    const navigation = useNavigation();

    const [ modalVisible, setModalVisible ] = React.useState(false);
    
    return(
        <View style={styles.navbar}>    
            <UserModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <TouchableOpacity 
                onPress={()=>setModalVisible(true)}>
                <Text>{context.uname}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar:{
        flex:1, 
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
    navElement:{
        margin: 5,
        justifyContent: 'center'
    },
});