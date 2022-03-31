import {View, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';
import EgmMapView from '../map-view/map-view';

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text>This is home screen</Text>
            <EgmMapView></EgmMapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
