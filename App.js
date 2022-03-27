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
  const [user, setUser] = React.useState(null);
  return (
    <EGMContext.Provider
      value={{user, setUser}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          
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
              title: "Map Config",
              headerRight: ()=>(<NavBar/>)
            }}
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