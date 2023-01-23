import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Alert, TextInput } from 'react-native';

export default function App() {
  const [text, onChangeText] = React.useState("");

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "tomato" }} ></View>
      <View style={{ flex: 1, backgroundColor: "teal" }} ></View>
      <View style={{ flex: 1, backgroundColor: "orange" }} ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  loginBtn: {
    color: "#06bcee"
  },
  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});

/*
*
    <View style={styles.container}>
      <Text style={styles.title}>Hello React Native</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        textContentType="emailAddress"
        placeholder="Email"
      />
      <Button
        title="LOGIN"
        style={styles.loginBtn}
        onPress={() => Alert.alert('Logging in...')}
      />

      <StatusBar style="auto" />
    </View>
*
*/