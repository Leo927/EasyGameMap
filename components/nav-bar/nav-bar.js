import * as React from 'react';
import { StyleSheet, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EGMContext from '../../context';
import { Avatar, Portal, Dialog, Button } from 'react-native-paper';
import { CLIENT_ID, SERVER_URL } from '../../secrets';
import * as Linking from 'expo-linking';


export default function NavBar(){
    const context = React.useContext(EGMContext);

    const navigation = useNavigation();

    const url = Linking.useURL();

    const [visible, setVisible] = React.useState(false);

    const onLogin = ()=>{
        const url = new URL('https://github.com/login/oauth/authorize');
        url.searchParams.append('client_id', CLIENT_ID);
        url.searchParams.append('redirect_uri', SERVER_URL+'/oauth2/github/callback');
        
        Linking.openURL(url.toString());
        setVisible(false);
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
    return(
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={()=>setVisible(false)}>
                    <Dialog.Content>
                        <Button mode='outlined' onPress={onLogin}>Login</Button>
                        <Button mode='outlined'>Options</Button>
                        <Button mode='outlined'>Logout</Button>
                    </Dialog.Content>
                </Dialog>
            </Portal>
            <TouchableOpacity onPress={()=>setVisible(true)}>
            <Avatar.Text 
                size={34} 
                label={context.user?.uname?context.user.uname[0]: "G"} 
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
});