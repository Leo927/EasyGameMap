import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-native-paper';

import EGMContext from './context';
import NavBar from './components/nav-bar/nav-bar';
import HomeScreen from './components/home-screen/home-screen';
import ProfileScreen from './components/profile-screen/profile-screen';
import MapConfigStack from './components/map-config/map-config';
import MapViewScreen from './components/map-view-screen/map-view-screen';

const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const App = () => {  
  const [user, setUser] = React.useState(null);
  return (
    <EGMContext.Provider
      value={{user, setUser}}>
      <Provider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='HomeStack'>
            
            <Stack.Screen
              name="HomeStack"
              component={HomeStack}
              options={{
                headerRight: ()=>(<NavBar/>),
              }}
            />

            <Stack.Screen
              name="MapConfigStack"
              component={MapConfigStack}
              options={{
                headerRight: ()=>(<NavBar/>),
              }}
            />

            <Stack.Screen
              name="MapViewScreen"
              component={MapViewScreen}
              options={{
                headerRight: ()=>(<NavBar/>),
              }}
            />
        </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </EGMContext.Provider>
  );
};

function HomeStack(){
    return(
      <Tab.Navigator
        barStyle = {{
          backgroundColor:"white"
        }}
        >
        <Tab.Screen 
          name="Home" component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}/>
        <Tab.Screen 
          name="Profile" 
          title="Profiles"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="map" color={color} size={26} />)
          }}/>
      </Tab.Navigator>
    );
}



export default App;