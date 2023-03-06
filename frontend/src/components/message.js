import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

export default function MessageBox({text, type}) {
    return (
        <View style={(type == 1) ? styles.messageBoxGreen : (type==2) ? styles.messageBoxBlue : styles.messageBoxRed}>
            <Text>{text}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    messageBoxGreen: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#5CE1E6',
        margin: 10,
        textAlignVertical: 'top',
    },
    messageBoxBlue: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#38B6FF',
        margin: 10,
        textAlignVertical: 'top',
    },
    messageBoxRed: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#EE6B6E',
        margin: 10,
        textAlignVertical: 'top',
    }
});
