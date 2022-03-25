import React from 'react';
import { View, Pressable, StyleSheet, Text, Button, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EGMContext from '../../context';

export default function UserModal(props){
    const context = React.useContext(EGMContext);
    const navigation = useNavigation();

    const onLoginPressed = ()=>{
        props.setModalVisible(false);
        navigation.navigate("Login");
    }

    const onMapPressed = ()=>{
        props.setModalVisible(false);
        navigation.navigate("UserMaps", {uid:context.uid});
    }

    const onOptionsPressed = ()=>{
        props.setModalVisible(false);
        navigation.navigate("Options");
    }

    const onLogoutPressed = ()=>{
        props.setModalVisible(false);
        console.log(`Current uid ${context.uid}`)
        console.log("Handle Logout here");
    }

    return(
        <Modal
            transparent={false}
            animationType="slide"
            visible={props.modalVisible}
            onRequestClose={() => {
            props.setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modal}>
                {!context.uid && <View style={styles.modalElement}>
                    <Button title='Login'
                        onPress={onLoginPressed}/>
                </View>}

                {context.uid && <View style={styles.modalElement}>
                    <Button title='Maps'
                        onPress={onMapPressed}/>
                </View>}

                <View style={styles.modalElement}>
                    <Button title='Options'
                        onPress={onOptionsPressed}/>
                </View>

                {context.uid && <View style={styles.modalElement}>
                    <Button title='Logout'
                        onPress={onLogoutPressed}/>
                </View>}
                
                <View style={styles.modalElement}>
                    <Button title='Cancel' 
                        onPress={()=>props.setModalVisible(false)}/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalElement:{
        margin: 2,
        marginLeft: 10,
        marginRight: 10,
    },
    modal:{
        flex: 1,
        justifyContent: 'center',
    },
});