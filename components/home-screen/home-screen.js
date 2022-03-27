import {View, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text>This is home screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
