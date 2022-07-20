
import React from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  //ScrollView,
  //StatusBar,
  StyleSheet,
  Text,
  TextInput,
  //useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.safe_area}>
      <View style={styles.body}>
        <View style={styles.title_view}>
          <Text style={styles.text}>
            AnyTalk
          </Text>
        </View>
        <View style={styles.input_view}>
            <TextInput style={styles.input}/>
            <View style={styles.button_view}>
              <View style={styles.button}>
                <Button title = "Convert to Speech" onPress={() => console.log("Button 1 Tapped!")}/>
              </View> 
              <View style={styles.button}>
                <Button title = "Receive voice" onPress={() => console.log("Button 2 Tapped!")}/>
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
  text: {
    fontSize: 30
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
    width: 300,
    height: 150,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000000'
  },
  button: {
    flex: 1,
    backgroundColor: '#55efc4'
  }
});

export default App;
