import {View, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';
import BottomNavBar from '../bottom-navbar/bottom-navbar';


export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <BottomNavBar navigation={navigation}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
