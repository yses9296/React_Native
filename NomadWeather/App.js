import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, Text, View, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons'; 
import config from 'react-native-config';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = 'ab9e97e6efb01ca88c5bc4b7f0b2655c';
const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const icons = {
  Clouds : "cloudy",
  Clear : "day-sunny",
  Snow : "snow",
  Rain : "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning"
}
const today = new Date();
const weekday = today.getDay()
const weekArr = Array(7).fill().map( (v, i) => (weekday + i) % 7);
let dateArr = [];

weekArr.forEach( (day) => {
  dateArr = [...dateArr, WEEKDAY[day]]
})


export default function App() {
  const [city, setCity] = useState("Loading...");
  const [confirm, setConfirm] = useState(true);

  const [days, setDays] = useState([]);

  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if(!granted){ 
      setConfirm(false);
    }

    const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({ accuracy: 5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
    setCity(location[0].city);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    const _json = await response.json();
    const filteredData = _json.list.filter( (data) => {
      if(data.dt_txt.includes("00:00:00")) return data
    })

    setDays(filteredData);
  }

  useEffect( () => {
      getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView 
        horizontal 
        pagingEnabled 
        // indicatorStyle = "black"       
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.weather}
      >
        { days.length == 0 
        ? 
          <View style={styles.load}>
            <ActivityIndicator size="large" />
          </View>
        : 
          days.map( (day, idx) => {
            return (
              <View style={styles.day} key={idx}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.date}>{day.dt_txt.split(' ')[0]}</Text>
                  <Text style={{fontSize: 24, fontWeight: '600', marginLeft: 20}}>{dateArr[idx]}</Text>
                </View>
        
                <Text style={styles.temp}>{Math.ceil(day.main.temp)} <Text style={styles.cSymbols}>&#8451;</Text> </Text>

                <View style={styles.descContiner}>
                  <Text style={styles.desc}>{day.weather[0].main}</Text>
                  <Fontisto name={icons[day.weather[0].main]} size={46} color="black" />
                </View>
                  
                <Text style={styles.subDesc}>{day.weather[0].description}</Text>

                <View style={styles.tempHL}>
                  <Text style={styles.tempHLText}>H: {Math.ceil(day.main.temp_max)} <Text style={{fontSize: 18}}>&#8451;</Text></Text>
                  <Text style={{...styles.tempHLText, marginLeft: 20}}>L: {Math.ceil(day.main.temp_min)} <Text style={{fontSize: 18}}>&#8451;</Text></Text> 
                </View>
              </View>
            )
          })
        }
      </ScrollView >

      <View style={styles.map}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#E6CDFF',
  },

  city: {
    flex: 1.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  cityName: {
    fontSize: 50,
    fontWeight: "600",
  },

  weather: {
    // flex: 4,
    borderTopColor: 'white',
    borderBottomColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 80
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 30,
  },
  date: {
    fontSize: 32,
    fontWeight: '600',
  },
  temp: {
    position: 'relative',
    fontSize: 150,
    fontWeight: "800",
    marginTop: 30
  },

  desc: {
    fontSize: 60,
    paddingRight: 20
  },
  subDesc: {
    fontSize: 20
  },
  cSymbols: {
    fontSize: 45
  },
  descContiner: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tempHL: {
    marginTop: 20,
    flexDirection: 'row'
  },
  tempHLText: {
    fontSize: 24
  },

  load: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: "space-around",
  },

  map: {
    flex: 1.4
  }
});

