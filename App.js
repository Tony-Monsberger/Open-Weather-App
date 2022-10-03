import { StatusBar } from 'expo-status-bar';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import {fetch} from "react-native/Libraries/Network/fetch";

function App() {
 const [data, setData] = useState([]);
 const [city , setCity] = useState(undefined)
const [buttonPressed, setButtonPressed] = useState(false);
 const API_KEY = "527f06cf4e44f47893b0a84d4104647d";
 const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

 const fetchData = async () => {
    try{    const response = await fetch(url);
        const data = await response.json();
        setData(data);
       }
    catch (error){
        console.log(error);
    }

 }

 useEffect(() => {
     fetchData();
 },[city]);

function DisplayWeatherData(){
    return (
        <View>
            <Text>{data.name}</Text>
            <Text>{data.timezone}</Text>
            <Text>{Math.floor(data.main.temp - 273.15)}</Text>
        </View>
            );
}




   return (
    <View style={styles.container}>
<Text>Welcome to the Open Weather App</Text>
        <input type = "text" onChange={event => setCity(event.currentTarget.value)} />
        <button onClick= {() => fetchData() && setButtonPressed(true)}>SEARCH</button>
<View>
    {buttonPressed === true ? <DisplayWeatherData/> : null}
</View>
        <StatusBar style="auto" />
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
});

export default App;