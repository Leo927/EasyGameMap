import React from 'react';
import { View, Pressable, StyleSheet, Text, Button, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EGMContext from '../../context';
import { CLIENT_ID } from '../../secrets';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';


WebBrowser.maybeCompleteAuthSession();

export default function UserModal(props){
    // Configure Github Endpoint
    const discovery = {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint: `https://github.com/settings/connections/applications/${CLIENT_ID}`,
    };
    // Create request
    const [request, response, promptAsync] = useAuthRequest(
        {
        clientId: CLIENT_ID,
        scopes: ['identity'],
        redirectUri: makeRedirectUri({ useProxy: true }),
        },
        discovery
    );
    
    // watch response and handle login response.
    React.useEffect(() => {
        if (response?.type === 'success') {
        const { code } = response.params;
        console.log(code);
        }
    }, [response]);

    const context = React.useContext(EGMContext);
    const navigation = useNavigation();

    const onLoginPressed = ()=>{
        // props.setModalVisible(false);
        // navigation.navigate("Login");
        promptAsync({useProxy:true});
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
                <View style={styles.modalElement}>
                    <Button title='Login'
                        disabled={!request}
                        onPress={onLoginPressed}/>
                </View>

                <View style={styles.modalElement}>
                    <Button title='Maps'
                        onPress={onMapPressed}/>
                </View>

                <View style={styles.modalElement}>
                    <Button title='Options'
                        onPress={onOptionsPressed}/>
                </View>

                <View style={styles.modalElement}>
                    <Button title='Logout'
                        onPress={onLogoutPressed}/>
                </View>
                
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