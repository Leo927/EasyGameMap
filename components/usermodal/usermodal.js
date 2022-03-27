/**Display a user context menu. Most importantly login. 
 * Authentication process from https://github.com/jhannes/react-native-oauth-demo
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Button } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import EGMContext from '../../context';
import { CLIENT_ID, SERVER_URL } from '../../secrets';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

function isValidString(string){
    if(string) return true;
    else return false;
}

WebBrowser.maybeCompleteAuthSession();

export default function UserModal(props){
    const context = React.useContext(EGMContext);

    const navigation = useNavigation();

    const url = Linking.useURL();

    const onLoginPressed = ()=>{
        const url = new URL('https://github.com/login/oauth/authorize');
        url.searchParams.append('client_id', CLIENT_ID);
        url.searchParams.append('redirect_uri', SERVER_URL+'/oauth2/github/callback');
        
        Linking.openURL(url.toString());
        props.setModalVisible(false);
    }

    const handleRedirectUrl = () =>{
        try{
            if(!url) return;
            let urlObject = Linking.parse(url);
            if(!urlObject) return;
            if(!urlObject?.queryParams?.uid){
                return;
            }
            const user = {
                token: urlObject.queryParams.token,
                uid: urlObject.queryParams.uid,
                uname: urlObject.queryParams.uname,
            }
            if(user.uid){
                console.log(`changing user to ${user}`);
                context.setUser(user);
            }
        }
        catch(e){
            console.error(e);
        }
    };

    React.useEffect(handleRedirectUrl, [url])

    const onMapPressed = ()=>{
        props.setModalVisible(false);
        navigation.navigate("UserMaps", {uid:context.user.uid});
    }

    const onOptionsPressed = ()=>{        
        props.setModalVisible(false);
        navigation.navigate("Options");
    }

    const onLogoutPressed = ()=>{
        props.setModalVisible(false);
        context.user = null;
    }
    return(
        <Modal
            contentContainerStyle = {styles.modal}
            visible={props.modalVisible}
            onDismiss={props.setModalVisible}
        >
            {context?.user?.uid==undefined&&
                <Button mode="outlined" onPress={onLoginPressed}>Login</Button>
            }
            

            {context?.user?.uid !=undefined &&
                <Button mode="outlined" onPress={onMapPressed}>Maps</Button>}

                <Button mode="outlined" onPress={onOptionsPressed}>Options</Button>

            {context?.user?.uid !=undefined && 
                <Button mode="outlined" onPress={onLogoutPressed}>Log Out</Button>}
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
        backgroundColor: 'white',
        padding: 20,
    },
});