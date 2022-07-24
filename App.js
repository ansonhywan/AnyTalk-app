
import React, { useState } from 'react';
import type {Node} from 'react';

import { Audio } from 'expo-av';
import {
  Button,
  Pressable,
  ProgressViewIOSComponent,
  SafeAreaView,
  //ScrollView,
  //StatusBar,
  StyleSheet,
  Text,
  TextInput,
  //useColorScheme,
  View,
} from 'react-native';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import * as functions from './src/utils/AudioUtils';
import FlatButton from './src/components/button';

const audioRecorderPlayer = new AudioRecorderPlayer();

const App = () => {
  const [text, setText] = useState("");
  const [recordingUrl, setRecordingUrl] = useState("No recordingUrl...");
  const [recordButtonText, setRecordButtonText] = useState("R")
    
  return (
    <SafeAreaView style={styles.safe_area}>
      <View style={styles.body}>
        <View style={styles.title_view}>
          <Text style={styles.title}>
            AnyTalk
          </Text>
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
                <FlatButton text='C' onPress={() => console.log(text)} />
              </View> 
              <View style={styles.button}>
                <FlatButton text={recordButtonText} onPress={() => {
                  console.log(recordingUrl)
                  if (recordButtonText === "R") {
                    functions.onStartRecord(audioRecorderPlayer).then(result => setRecordingUrl(result))
                    setRecordButtonText("S")
                  } else {
                    functions.onStopRecord(audioRecorderPlayer)
                    setRecordButtonText("R")
                    console.log(recordingUrl)
                  }
                }} />
              </View>
              <View style={styles.button}>
                <FlatButton text='P' onPress={() => {
                  functions.onStartPlay(audioRecorderPlayer)
                  console.log(recordingUrl)
                }} />
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
    alignItems: 'center'
  },
  title_view: {
    flex: 1,
    backgroundColor: '#a29bfe'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  input_view: {
    backgroundColor: '#dfe6e9',
    flex: 0.5
  },
  button_view: {
    flex: 1,
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    width: 300,
    height: 150,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top'
  },
  button: {
    flex: 1,
    backgroundColor: '#55efc4',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
