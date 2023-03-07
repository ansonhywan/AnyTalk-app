import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function MessageBox({ text, type, timestamp }) {
    return (
        <View style={type_to_color[type]}>
            <Text>{text}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
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
    },
    messageBoxPrompt: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fde26c',
        margin: 10,
        textAlignVertical: 'top',
    },
    timestamp: {
        textAlign: 'right',
        fontSize: 10,
        paddingTop: 5
    }
});

const type_to_color = {
    'speech': styles.messageBoxGreen,
    'text': styles.messageBoxBlue,
    'prompt': styles.messageBoxPrompt,
    'error': styles.messageBoxRed
};

