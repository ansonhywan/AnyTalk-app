import React from 'react';
import { FlatList } from 'react-native';
import MessageBox from './message';

const MessageList = ({ messages }) => {
    return (
        <FlatList
            data={messages}
            inverted contentContainerStyle={{ flexDirection: 'column-reverse' }}
            renderItem={({ item }) => (
                <MessageBox text={item.text} type={item.type} timestamp={item.message_time} />
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default MessageList;
