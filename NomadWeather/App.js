import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, ScrollView, Alert, TextInput, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.city}>
        <Text style={styles.cityName}>SEOUL</Text>
      </View>

      <ScrollView 
        horizontal 
        pagingEnabled 
        // indicatorStyle = "black"       
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>23</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>20</Text>
          <Text style={styles.desc}>Cloudy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>13</Text>
          <Text style={styles.desc}>Rain</Text>
        </View>
      </ScrollView >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'skyblue'
  },

  city: {
    flex: .7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 68,
    fontWeight: "600",
  },

  weather: {
    // flex: 4,
    backgroundColor: 'white',
  },
  day: {
    // flex: 1,
    width: SCREEN_WIDTH,
    paddingLeft: 50
  },
  temp: {
    fontSize: 180,
    fontWeight: "800",
    marginTop: 30
  },
  desc: {
    fontSize: 50,
  }

});

