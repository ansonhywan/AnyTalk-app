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
  const [recordingUrl, setRecordingUrl] = useState('');
  const [speechUrl, setSpeechUrl] = useState('');
  const [convertButtonText, setConvertButtonText] = useState('C');
  const [recordButtonText, setRecordButtonText] = useState('R');

  return (
    <SafeAreaView style={styles.safe_area}>
      <View style={styles.body}>
        <View style={styles.title_view}>
          <Text style={styles.title}>AnyTalk</Text>
          <View style={styles.text_view}>
            <Text style={styles.translated_text}>
              Translated Speech-to-Text will be displayed here. Make custom
              component if we have time.Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </Text>
          </View>
        </View>
        <View style={styles.input_view}>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder="Type text to be read aloud..."
            onChangeText={newText => setText(newText)}
          />
          <View style={styles.button_view}>
            <View style={styles.button}>
              <FlatButton
                text={convertButtonText}
                onPress={() => {
                  if (convertButtonText === 'C') {
                    setConvertButtonText('P');
                    // MAKE TEXT TO SPEECH API CALL HERE
                    // 1. Construct JSON BODY
                    var req_body = {
                      text: text,
                    };
                    // 2. Make GET Request to TS API sending ('GET', req_body)
                    ApiHelperFunctions.getSpeechFromText(req_body).then(
                      result => {
                        setSpeechUrl(result);
                      },
                    );
                    // 3. When result is received, display toast.play it.
                  } else {
                    // Play speech sound from url received here.
                    console.log(speechUrl);
                    setConvertButtonText('C');
                    SoundPlayer.playUrl(speechUrl);
                  }
                }}
              />
            </View>
            <View style={styles.button}>
              <FlatButton
                text={recordButtonText}
                onPress={() => {
                  console.log(recordingUrl);
                  if (recordButtonText === 'R') {
                    functions
                      .onStartRecord(audioRecorderPlayer)
                      .then(result => setRecordingUrl(result));
                    setRecordButtonText('S');
                  } else {
                    functions.onStopRecord(audioRecorderPlayer);
                    setRecordButtonText('R');
                    console.log(recordingUrl);
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
