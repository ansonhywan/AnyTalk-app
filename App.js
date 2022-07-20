
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
    <SafeAreaView style={styles.body}>
      <View>
        <Text style={styles.text}>
          AnyTalk
        </Text>
      </View>
      <View style={styles.input_view}>
        <TextInput style={styles.input}>

        </TextInput>
        <Button title = "Convert to Speech" onPress={() => console.log("Button 1 Tapped!")}/>
        <Button title = "Receive voice" onPress={() => console.log("Button 2 Tapped!")}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  },
  input_view: {
    position: 'absolute',
    bottom: 150
  },
  input: {
    flex: 1,
    width: 300,
    height: 150,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: '#000000'
  }
});

export default App;
