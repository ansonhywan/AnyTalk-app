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

        <View style={styles.input_view}>
          <TextInput
            ref={input => {
              this.textInput = input;
            }}
            style={styles.input}
            multiline={true}
            placeholder="Type text to be read aloud..."
            onChangeText={newText => setText(newText)}
          />
        </View>
        
        <View style={styles.button_view}>
          <View style={styles.button}>
            <Button // Convert T2S (entered text)
              text="C"
              onPress={() => {
                // MAKE TEXT TO SPEECH API CALL HERE
                // 1. Construct JSON BODY
                var req_body = {
                  text: text,
                };
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
          <View style={styles.button}>
            <Button // Convert S2T (recording)
              text="R"
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
          <View style={styles.button}>
            <Button // Clear text in input area
              text="X"
              onPress={() => {
                functions.onStartPlay(audioRecorderPlayer); // is this copied from record? we should only clear right
                console.log(recordingUrl);
              }}
            />
          </View>
        </View>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe_area: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: '#003452', //89CFF0
    alignItems: 'center',
    padding: 10,
  },
  title_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chat_view: {
    flex: 0.2,
    padding: 150,
    borderRadius: 25,
    backgroundColor: 'white',
    margin: 10,
  },
  translated_text: {
    fontSize: 20,
  },
  input_view: {
    flex: 1,
  },
  input: {
    flex: 1,
    width: 300,
    height: 150,
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
  button: {
    flex: 0.5,
    backgroundColor: '#003452',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#38b6ff',
  },
});

export default App;
