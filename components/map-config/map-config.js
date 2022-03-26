import * as React from 'react';
import { View, Pressable, StyleSheet, Text, Button, TouchableOpacity, Picker, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EGMContext from '../../context';

import TextEntry from '../text-input/text-input';
import PullToRefreshViewNativeComponent from 'react-native/Libraries/Components/RefreshControl/PullToRefreshViewNativeComponent';

export default function MapConfig(){
    const route = useRoute();

    const context = React.useContext(EGMContext);

    const {mapName, setMapName} = React.useState("Empty Name");

    const onCreatePressed = ()=>{
     console.log(route?.params?.mapId);
        
    }

    return(
        <View>
            {}

            <Text>Map Config Page</Text>
            <TextEntry 
                label ="Name"
                placeholder = "Enter Map Name"
                onValueChange = {setMapName}
                isValidInput={(value)=>value}
                errorText="Map name cannot be empty"/>

            <TextEntry 
                label ="Name"
                placeholder = "Enter Map Name"
                onValueChange = {setMapName}
                isValidInput={(value)=>value}
                errorText="Map name cannot be empty"/>

            <Button
                title={route?.params?.mapId?"Update":"Create"}
                onPress={onCreatePressed}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    entry: {
        height: 30,
    }
});