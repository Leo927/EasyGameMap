import {View, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';
import MapView from '../map-view/map-view';

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text>This is home screen</Text>
            <MapView></MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
