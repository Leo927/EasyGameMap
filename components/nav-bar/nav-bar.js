import * as React from 'react';
import { View, Pressable, StyleSheet, Text, Button, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EGMContext from '../../context';
import UserModal from '../usermodal/usermodal';
import { Avatar, Portal, Provider } from 'react-native-paper';

export default function NavBar(){
    const context = React.useContext(EGMContext);

    const navigation = useNavigation();

    const [ modalVisible, setModalVisible ] = React.useState(false);
    
    return(
        <View style={styles.navbar}>    
            <Portal>
                <UserModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            </Portal>
            <TouchableOpacity 
                onPress={()=>setModalVisible(true)}>
                <Avatar.Text size={35} label={context.user?.uname?context.user.uname[0]:""}/>
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
        justifyContent: 'center',
        minWidth: 60,
        minHeight: 30,
    },
});