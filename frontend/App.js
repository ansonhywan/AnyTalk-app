import * as functions from './src/utils/AudioUtils';
import Button from './src/components/button';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import SoundPlayer from 'react-native-sound-player';
import * as ApiHelperFunctions from './src/utils/ApiUtils';

import React, { useState } from 'react';

import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();

const App = () => {
  const [text, setText] = useState('');
  const [textFromSpeech, setTextFromSpeech] = useState('');
  const [recordingUrl, setRecordingUrl] = useState('');
  const [recordButtonText, setRecordButtonText] = useState('Record');

  return (
    <SafeAreaView style={styles.safe_area}>

      <View style={styles.body}>

        <View style={styles.title_view}>
          <Image source={require('./fe-resources/AnyTalk-1.png')} />
        </View>

        <View style={styles.chat_view}>
          <Text style={styles.translated_text}>{textFromSpeech}</Text>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
          <KeyboardAvoidingView
            style={styles.input_view}
            behavior={(Platform.OS === 'ios') ? "padding" : "height"}
          >
            <ScrollView>
              <View style={{ height: 220 }}>
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
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

        </TouchableWithoutFeedback>

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
                { setTextFromSpeech(text) }
                // 2. Make GET Request to TS API sending ('GET', req_body)
                ApiHelperFunctions.getSpeechFromText(req_body).then(
                  result => {
                    SoundPlayer.playUrl(result);
                  },
                );
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
                  functions
                    .onStartRecord(audioRecorderPlayer)
                    .then(result => setRecordingUrl(result));
                  setRecordButtonText('Stop');
                } else {
                  functions.onStopRecord(audioRecorderPlayer);
                  setRecordButtonText('Record');
                  console.log(recordingUrl);
                  ApiHelperFunctions.uploadAudioToBucket({
                    local_path: recordingUrl,
                  }).then(result => {
                    ApiHelperFunctions.getTextFromSpeech({
                      speech_path: result,
                    }).then(result2 => {
                      setTextFromSpeech(result2);
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
                functions.onStartPlay(audioRecorderPlayer); // DEBUG, plays back recorded sample.
                console.log(recordingUrl);
              }}
            />
          </View>

        </View>

      </View >

    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  safe_area: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: '#003452',
    alignItems: 'center',
    padding: 10,
  },
  title_view: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chat_view: {
    width: 300,
    flex: 1,
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'white',
    margin: 10,
    textAlignVertical: 'top',
  },
  translated_text: {
    fontSize: 20,
  },
  input_view: {
    flex: 1,
  },
  input: {
    width: 300,
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#7393B3',
    backgroundColor: 'white',
    padding: 10,
    textAlignVertical: 'top',
  },
  button_view: {
    flex: 0.5,
    flexDirection: 'row',
  },
  button_row: {
    flex: 0.5,
    backgroundColor: '#003452',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#38b6ff',
    fontSize: '10',
  },
});

export default App;