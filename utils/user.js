import { CLIENT_ID, SERVER_URL } from "../secrets";

import { Linking } from "react-native-web";
export function githubLogin(callback){
    const url = new URL('https://github.com/login/oauth/authorize');
    url.searchParams.append('client_id', CLIENT_ID);
    url.searchParams.append('redirect_uri', SERVER_URL+'/oauth2/github/callback');
    
    Linking.openURL(url.toString());
    if(typeof callback === 'function')
        callback();
}