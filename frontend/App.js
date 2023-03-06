import * as functions from './src/utils/AudioUtils';
import Button from './src/components/button';
import BigButton from './src/components/bigButton'
import MessageList from './src/components/messageList';
import MessageBox from './src/components/message';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import SoundPlayer from 'react-native-sound-player';
import * as ApiHelperFunctions from './src/utils/ApiUtils';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React, { useState, useRef, useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();
const errorAudioUrl = 'https://storage.googleapis.com/anytalk-bucket/error-audio-do-not-delete.mp3'
const recordAudioSoundUrl = 'https://storage.googleapis.com/anytalk-bucket/beep-record-sound.mp3'
const endRecordAudioSoundUrl = 'https://storage.googleapis.com/anytalk-bucket/beep-end-record.mp3'

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.home_body}>

      <View style={styles.home_button_view}>
        <BigButton
          text="New Chat Session"
          onPress={() =>
            navigation.navigate('Chat')
          }
        />
      </View>
      <View style={styles.home_button_view}>
        <BigButton style={{}}
          text="View Previous Chats"
          onPress={() => {
            navigation.navigate('History')
          }
          }
        />
      </View>

      <View style={styles.home_padding}>

      </View>
    </View >
  );
};

const ChatScreen = () => {
  const [text, setText] = useState('');
  const [textFromSpeech, setTextFromSpeech] = useState('');
  const [recordingUrl, setRecordingUrl] = useState('');
  const [recordButtonText, setRecordButtonText] = useState('Record');
  const [messages, setMessage] = useState([]);
  const scrollViewRef = useRef();

  return (
    <SafeAreaView style={styles.safe_area}>

      <View style={styles.body}>

        {/* <View style={styles.title_view}>
          <Image style={styles.logo} source={require('./fe-resources/AnyTalk-1.png')} />
        </View> */}

        <ScrollView style={styles.chat_view} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
          {messages.map(message => (
            <MessageBox text={message.body} type={message.type} />
          ))}
        </ScrollView>

        <KeyboardAvoidingView style={styles.input_view} behavior={(Platform.OS === 'ios') ? "padding" : "height"}>
          <TextInput
            ref={input => {
              this.textInput = input;
            }}
            style={styles.input}
            multiline={true}
            placeholder="Type text to be read aloud..."
            onChangeText={newText => setText(newText)}
            returnKeyType='done'
            onSubmitEditing={Keyboard.dismiss}  //working, however pressing elsewhere does not stow
          />
        </KeyboardAvoidingView>

        <View style={styles.button_view}>

          <View style={styles.button_row}>
            <Button // Convert T2S (entered text)
              text="Convert"
              onPress={() => {
                // MAKE TEXT TO SPEECH API CALL HERE
                // 1. Construct JSON BODY
                var req_body = {
                  text: text,
                };
                if (text != '') {
                  setMessage([
                    ...messages,
                    { body: text, type: 1 }
                  ]);
                  // 2. Make GET Request to TS API sending ('GET', req_body)
                  ApiHelperFunctions.getSpeechFromText(req_body).then(
                    result => {
                      SoundPlayer.playUrl(result);
                    },
                  );
                  setText('');
                }
                this.textInput.clear();
              }}
            />
          </View>

          <View style={styles.button_row}>
            <Button // Convert S2T (recording)
              text="Record"
              onPress={() => {
                console.log(recordingUrl);
                if (recordButtonText === 'Record') {
                  SoundPlayer.playUrl(recordAudioSoundUrl);
                  functions
                    .onStartRecord(audioRecorderPlayer)
                    .then(result => setRecordingUrl(result));
                  setRecordButtonText('Stop');
                } else {
                  SoundPlayer.playUrl(endRecordAudioSoundUrl);
                  functions.onStopRecord(audioRecorderPlayer);
                  setRecordButtonText('Record');
                  console.log(recordingUrl);
                  ApiHelperFunctions.uploadAudioToBucket({
                    local_path: recordingUrl,
                  }).then(result => {
                    ApiHelperFunctions.getTextFromSpeech({
                      speech_path: result,
                    }).then(result2 => {
                      let type = 2;
                      if (typeof result2 === "undefined") {
                        result2 = "Sorry, we did not get that. Could you repeat what you said?"
                        type = -1;
                        SoundPlayer.playUrl(errorAudioUrl);
                      }
                      setTextFromSpeech(result2);
                      setMessage([
                        ...messages,
                        { body: result2, type: type }
                      ]);
                      console.log(messages)
                    });
                  });
                }
              }}
            />
          </View>

          <View style={styles.button_row}>
            <Button
              text="Clear"
              onPress={() => {
                setMessage([]);
                // functions.onStartPlay(audioRecorderPlayer); // DEBUG, plays back recorded sample.
                console.log(recordingUrl);
              }}
            />
          </View>

          <View style={styles.button_row}>
            <Button
              text="test"
              onPress={() => {
                setMessage([
                  ...messages,
                  { body: "Some very long text. Some very long text. Some very long text. Some very long text. Some very long text. Some very long text.", type: 2 }
                ]);
                console.log(messages)
              }}
            />
          </View>

        </View>

      </View >

    </SafeAreaView >
  )
};

const HistoryScreen = () => {
  const scrollViewRef = useRef();
  const [messages, setMessage] = useState([]);
  useEffect(() => {
    ApiHelperFunctions.getPrevMessages().then(
      result => {
        setMessage(result);
      }
    );
  }, []);

  return (
    <SafeAreaView style={styles.hist_safe_view}>
      <MessageList style={styles.hist_body} messages={messages} />

      <View style={styles.hist_button_view}>
        <Button
          text="Delete Chat History"
          onPress={() => {
            ApiHelperFunctions.deleteMessages()
            setMessage([]);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'AnyTalk'}>
        <Stack.Screen name="AnyTalk" component={HomeScreen} options={{
          headerTitle: () => ( // App Logo
            <Image
              style={{ width: 300, height: 30, }}
              source={require('./fe-resources/AnyTalk-1.png')}
              resizeMode='center'

            />
          ),
          headerStyle: { backgroundColor: '#003452' }
        }}
        />
        <Stack.Screen name="Chat" component={ChatScreen} options={{
          headerTitleStyle: {
            color: 'white'
          },
          headerStyle: { backgroundColor: '#003452' }
        }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{
          headerTitleStyle: {
            color: 'white'
          },
          headerStyle: { backgroundColor: '#003452' } }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // Chat Screen
  safe_area: {
    flex: 1,
    backgroundColor: '#003452',
  },
  body: {
    flex: 1,
    backgroundColor: '#003452',
    alignItems: 'center',
    padding: 10,
  },
  title_view: {
    flex: 0.1,
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chat_view: {
    width: 370,
    flex: 1,
  },
  translated_text: {
    fontSize: 20,
  },
  input_view: {
    flex: 0.2,
    paddingTop: 10,
  },
  input: {
    width: 350,
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#7393B3',
    backgroundColor: 'white',
    padding: 10,
  },
  button_view: {
    flex: 0,
    flexDirection: 'row',
    paddingTop: 10,
  },
  button_row: {
    flex: 0.5,
    backgroundColor: '#003452',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#38b6ff',
    fontSize: '10',
  },
  logo: {
    resizeMode: 'contain',
    height: 200,
    width: 300,
  },

  // Home Screen
  home_safe_view: {
    flex: 1,
  },
  home_body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
  },
  home_button_view: {
    flex: 1,
    backgroundColor: '#003452',
    alignItems: 'center',
    justifyContent: 'center',
  },
  home_padding: {
    flex: 1.5,
    backgroundColor: '#003452',
  },

  // History Screen
  hist_safe_view: {
    flex: 1,
    backgroundColor: '#003452',
  },
  hist_button_view: {
    alignItems: 'center',
    paddingTop: 15
  }
});

export default App;
