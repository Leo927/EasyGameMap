/**
 * text-input.js
 * Implements a self containing text input field. 
 * Author: Songhao Li
 */

import * as React from 'react';
import { View, TextInput, StyleSheet, Text, Button, TouchableOpacity, Picker, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EGMContext from '../../context';


const TextEntry = (props)=>{
    // whether the user has ever changed the input text. true if input text was changed else false. 
    const [started, setStarted] = React.useState(false);

    return(
        <View style={[styles.container, props.style]}>
            <View style={[styles.row]}>
                <Text style={styles.description}>{props.description}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>{props.label}</Text>
                <TextInput
                    style={styles.input}
                    value={props.value}
                    placeholder={props.placeholder}
                    onChangeText = {(newValue)=>{ 
                        setStarted(true);
                        props.onValueChange(newValue);
                    }}
                />
            </View>
            <View style={styles.row}>
                {(started && !props.isValidInput(props.value) )&&<Text style={styles.errorText}>{props.errorText}</Text>}
            </View>
        </View>
    );
}

TextEntry.defaultProps = {
    label: "Empty Label",
    onValueChange: (value)=>{},
    description: "Description Goes here",
    errorText: "Empty Error Text",
    isValidInput: (value)=>true,
    placeholder: "Empty Place Holder",
}

const styles = StyleSheet.create({
    container: {
        height :50,
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label:{
        flex:1,
        marginRight: 5,
    },
    input:{
        flex:4,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 2,
        padding: 0,
    },
    description:{
        textAlign: 'center',
        fontSize: 10,
    },
    errorText:{
        flex: 2,
        color: 'red',
        fontSize: 10,
        textAlign: 'center',
    }
})

export default TextEntry;