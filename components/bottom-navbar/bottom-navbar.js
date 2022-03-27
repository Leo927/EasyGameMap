import React from 'react';
import { BottomNavigation, Text } from "react-native-paper";
import { View } from 'react-native';
import UserMaps from '../usermaps/usermaps';

export default function BottomNavBar({navigation}) {
  
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'Home', title: 'Home', icon: 'home' },
      { key: 'UserMaps', title: 'Maps', icon: 'map' },
      { key: 'MapConfig', title: 'Config', icon: 'history' },
    ]);
  
    const onIndexChange = i=>{
        setIndex(i);
        const route = routes[i];
        navigation.navigate(route.key);
    }

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={onIndexChange}
            renderScene={()=>null}
        />
    );
};