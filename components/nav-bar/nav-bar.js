import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EGMContext from '../../context';
import { Avatar, Portal, Dialog, Button } from 'react-native-paper';
import { CLIENT_ID, SERVER_URL } from '../../secrets';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${CLIENT_ID}`,
};

/**
 * Handles login and logout
 */
export default function NavBar(){
    const context = React.useContext(EGMContext);

    const navigation = useNavigation();

    const [visible, setVisible] = React.useState(false);
  
    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: CLIENT_ID,
        scopes: ['identity'],
        redirectUri: makeRedirectUri({useProxy:true})
      },
      discovery
    );

    // Listen to login response. 
    // Takes the returned code and ask server for access token. 
    React.useEffect(async () => {
      if (response?.type === 'success') {
        try{
          const { code } = response.params;
          const exchangeTokenEndPoint = SERVER_URL + `/oauth2/exchange/github/${code}`;
          const res =  await fetch(exchangeTokenEndPoint);
          if(!res.ok)
            throw "Server Error";
          const resJson = await res.json();
          context.setUser(u=>({...u,  token:resJson.token}));
        }catch(e){
          console.error(`Failed to exchange token`, e);
          return;
        }
      }
    }, [response]);

    /**
     * Handles user clicking login
     */
    const onLogin = ()=>{
      promptAsync({useProxy:true})
      setVisible(false);
    }

    /**
     * Watch user token change and fetch username and uid from token. 
     */
    React.useEffect(async()=>{
      if(!context.user?.token)
        return;
      const token = context.user.token;
      const userEndPoint = SERVER_URL + `/oauth2/user/github`;
      const res =  await fetch(userEndPoint,
        {
          method: 'POST',
          body:JSON.stringify({token}),
          headers: {'Content-Type': 'application/json'}
        });
      if(!res.ok){
        Alert.alert("Failed to login. Bad Response.");
        return;
      }
      const resJson = await res.json();
      if(!resJson.uid||!resJson.uname || !resJson.token){
        Alert.alert("Failed to login");
        return;
      }
      context.setUser(resJson);
      
      console.log(`user changed`, context.user);
    },[context.user?.token])

    function logout(){
      context.setUser(undefined);
    }

    return(
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={()=>setVisible(false)}>
                    <Dialog.Content>
                        {!context.user && 
                        <Button mode='outlined' onPress={onLogin}>Login</Button>}

                        <Button mode='outlined'>Options</Button>
                        
                        {context.user&&
                        <Button mode='outlined' onPress={logout}>Logout</Button>}
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