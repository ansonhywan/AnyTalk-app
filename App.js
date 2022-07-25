import * as functions from './src/utils/AudioUtils';
import FlatButton from './src/components/button';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import SoundPlayer from 'react-native-sound-player';
import * as ApiHelperFunctions from './src/utils/ApiUtils';

import React, {useState} from 'react';

import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();

const App = () => {
  const [text, setText] = useState('');
  const [textFromSpeech, setTextFromSpeech] = useState('');
  const [remotePath, setRemotePath] = useState('');
  const [recordingUrl, setRecordingUrl] = useState('');
  const [speechUrl, setSpeechUrl] = useState('');
  const [convertButtonText, setConvertButtonText] = useState('C');
  const [recordButtonText, setRecordButtonText] = useState('Record');

  return (
    <SafeAreaView style={styles.safe_area}>
      <View style={styles.body}>
        <View style={styles.title_view}>
          <Text style={styles.title}>AnyTalk</Text>
          <View style={styles.text_view}>
            <Text style={styles.translated_text}>{textFromSpeech}</Text>
          </View>
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
          <View style={styles.button_view}>
            <View style={styles.button}>
              <FlatButton
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
                      setSpeechUrl(result);
                      SoundPlayer.playUrl(speechUrl);
                    },
                  );
                  this.textInput.clear();
                }}
              />
            </View>
            <View style={styles.button}>
              <FlatButton
                text={recordButtonText}
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
              <FlatButton
                text="X"
                onPress={() => {
                  functions.onStartPlay(audioRecorderPlayer);
                  console.log(recordingUrl);
                }}
              />
            </View>
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
    backgroundColor: '#81ecec',
    alignItems: 'center',
  },
  title_view: {
    flex: 1,
    backgroundColor: '#a29bfe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_view: {
    flex: 1,
    padding: 30,
    backgroundColor: '#ffeaa7',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  translated_text: {
    fontSize: 20,
  },
  input_view: {
    backgroundColor: '#dfe6e9',
    flex: 0.5,
  },
  button_view: {
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    width: 300,
    height: 150,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
  button: {
    flex: 1,
    backgroundColor: '#55efc4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
