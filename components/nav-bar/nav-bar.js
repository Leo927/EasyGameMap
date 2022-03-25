import * as React from 'react';
import { View, Pressable, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';

export default function NavBar(){
    return(
        <View style={styles.navbar}>            
            <Text>Nav Name</Text>
            
            <TouchableOpacity
                style={styles.navElement}>
                <Text>A</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.navElement}>
                <Text>B</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar:{
        flex:1, 
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
    navElement:{
        width: 30,
        backgroundColor: 'red',
        margin: 2
    },
});