import React from 'react';
import { FlatList, View, Text, ScrollView } from 'react-native';
import MessageBox from './message';

const MessageList = ({ messages }) => {
    return (
        <FlatList
            data={messages}
            inverted contentContainerStyle={{ flexDirection: 'column-reverse' }}
            renderItem={({ item }) => (
                <MessageBox text={item.text} type={item.type} />
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default MessageList;
