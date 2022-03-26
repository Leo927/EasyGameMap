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



WebBrowser.maybeCompleteAuthSession();

export default function UserModal(props){
    const context = React.useContext(EGMContext);

    const navigation = useNavigation();

    const url = Linking.useURL();

    // used for storing the subscription to Linking url change
    const [lnkSubscription, setLnkSubscription] = React.useState();

    const onLoginPressed = ()=>{
        const url = new URL('https://github.com/login/oauth/authorize');
        url.searchParams.append('client_id', CLIENT_ID);
        url.searchParams.append('redirect_uri', SERVER_URL+'/oauth2/github/callback');
        
        Linking.openURL(url.toString());
        props.setModalVisible(false);
    }

    const handleRedirectUrl = () =>{
        console.log(props.modalVisible);
        if(!url) return;
        let urlObject = Linking.parse(url);
        if(!urlObject) return;
        if(!urlObject.queryParams){
            return;
        }
        const {uid, uname} = urlObject.queryParams;
        context.setUid(uid?uid:"");
        context.setUname(uname?uname:"");
        navigation.navigate("UserMaps", {uid:uid});
    };

    React.useEffect(handleRedirectUrl, [url])

    // handle redirect
    React.useEffect(()=>{
        // lnkSubscription&&Linking.removeEventListener(lnkSubscription);
        // setLnkSubscription(Linking.addEventListener('url', (e)=>handleRedirectUrl(e.url)));
        // Linking.getInitialURL().then(url => {
        //   if (url) handleRedirectUrl(url);
        // }).catch((e)=>console.error("Error opening initial url. "+e));
    }, [])

    const onMapPressed = ()=>{
        // props.setModalVisible(false);
        // navigation.navigate("UserMaps", {uid:context.uid});
    }

    const onOptionsPressed = ()=>{
        console.log(`Current uid ${context.uid}`);
        // props.setModalVisible(false);
        // navigation.navigate("Options");
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
            props.setModalVisible(false);
            }}
        >
            <View style={styles.modal}>
                {context.uid == false&&<View style={styles.modalElement}>
                    <Button title='Login'
                        onPress={onLoginPressed}/>
                </View>}
                

                {context.uid == true &&<View style={styles.modalElement}>
                    <Button title='Maps'
                        onPress={onMapPressed}/>
                </View>}

                <View style={styles.modalElement}>
                    <Button title='Options'
                        onPress={onOptionsPressed}/>
                </View>

                {context.uid == true && <View style={styles.modalElement}>
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