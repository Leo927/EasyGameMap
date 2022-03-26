import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EGMContext from './context';
import NavBar from './components/nav-bar/nav-bar';
import UserMaps from './components/usermaps/usermaps';
import MapConfig from './components/map-config/map-config';

const Stack = createNativeStackNavigator();

const App = () => {  
  const [uname, setUname] = React.useState("Dummy user");
  const [uid, setUid] = React.useState("");
  return (
    <EGMContext.Provider
      value={{uname, setUname, uid, setUid}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='MapConfig'>
          
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerRight: ()=>(<NavBar/>)
            }}
          />

          <Stack.Screen
            name="UserMaps"
            component={UserMaps}
            options={{
              headerRight: ()=>(<NavBar/>)
            }}
          />

          <Stack.Screen
            name="MapConfig"
            component={MapConfig}
            options={{
              headerRight: ()=>(<NavBar/>)
            }}
            initialParams = {{mapId:"TestMapId"}}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </EGMContext.Provider>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
      <View>
        <Text>
          Test
        </Text>
      </View>
  );
};

export default App;

// import * as React from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
// import { Button, Text, StyleSheet, View } from 'react-native';

// import {CLIENT_ID} from './secrets';

// WebBrowser.maybeCompleteAuthSession();

// // Endpoint
// const discovery = {
//   authorizationEndpoint: 'https://github.com/login/oauth/authorize',
//   tokenEndpoint: 'https://github.com/login/oauth/access_token',
//   revocationEndpoint: `https://github.com/settings/connections/applications/${CLIENT_ID}`,
// };

// export default function App() {
//   const [request, response, promptAsync] = useAuthRequest(
//     {
//       clientId: CLIENT_ID,
//       scopes: ['identity'],
//       redirectUri: makeRedirectUri({ useProxy: true })
//     },
//     discovery
//   );

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { code } = response.params;
//       console.log(code);
//       }
//   }, [response]);

//   return (
//     <View style={styles.container}>
//       <Text>Test</Text>
//       <Button
//       disabled={!request}
//       title="Login"
//       onPress={() => {
//         promptAsync();
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//   },
// })