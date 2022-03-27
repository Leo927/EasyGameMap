/**Display a user context menu. Most importantly login. 
 * Authentication process from https://github.com/jhannes/react-native-oauth-demo
 */
import React from 'react';
import { View, StyleSheet, Button, Modal } from 'react-native';
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
        console.log({user:context.user});
    }

    const onOptionsPressed = ()=>{        
        props.setModalVisible(false);
        navigation.navigate("Options");
    }

    const onLogoutPressed = ()=>{
        props.setModalVisible(false);
        console.log(`Current uid ${context.user}`)
        console.log("User logged out.");
        context.user = null;
    }
    return(
        <Modal
            transparent={false}
            animationType="slide"
            visible={props.modalVisible}
            onRequestClose={() => {
            props.setModalVisible(false);
            }}
        >
            <View style={styles.modal}>
                {context?.user?.uid==undefined&&<View style={styles.modalElement}>
                    <Button title='Login'
                        onPress={onLoginPressed}/>
                </View>}
                

                {context?.user?.uid !=undefined &&<View style={styles.modalElement}>
                    <Button title='Maps'
                        onPress={onMapPressed}/>
                </View>}

                <View style={styles.modalElement}>
                    <Button title='Options'
                        onPress={onOptionsPressed}/>
                </View>

                {context?.user?.uid !=undefined && <View style={styles.modalElement}>
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