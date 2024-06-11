import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import ForecastItem from '@/components/day8/ForecastItem';

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;

type Main = {
    "temp": number
    "feels_like": number,
    "temp_min": number,
    "temp_max": number,
    "pressure": number,
    "humidity": number
}

type Weather = {
    name: string,
    main: Main
}

export type Forecast = {
    main: Main,
    dt: number
}

const WeatherScreen = () => {
    const [weather, setWeather] = useState<Weather>()

    const [forecast, setForecast] = useState<Forecast[]>([])

    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if(location) {
            fetchWeatherData()
            fetchWeatherForecast()
        }

    }, [location])

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            console.log(location)
            setLocation(location);
        })();
    }, []);

    const lat = 23.7731, lon = 90.3657;

    // const fetchStr = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric`

    const fetchStr = `${BASE_URL}/weather?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`

    const fetchWeatherData = async () => {
        if(!location) return

        // fetch(fetchStr).then(data => data.json()).then(data => console.log(data)).catch(err => console.log(err))

        const res = await fetch(fetchStr)

        const data = await res.json()

        // console.log(JSON.stringify(data, null, 2))

        setWeather(data)
    }

    const fetchWeatherForecast = async () => {
        if(!location) return

        // api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
        
        const numberOfDays = 6;
        
        const str = `${BASE_URL}/forecast?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`

        const res = await fetch(str)

        const data = await res.json()

        // console.log(JSON.stringify(data, null, 2))
        setForecast(data?.list)
    }

    if (!weather) {
        return <ActivityIndicator />
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
            <Text style={styles.location}>{weather?.name}</Text>
            <Text style={styles.temp}>{Math.round(weather?.main?.temp)}&deg;</Text>
            </View>

            <FlatList 
                data={forecast}
                horizontal
                style={{flexGrow: 0, height: 200., marginBottom: 20}}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{gap: 10}}
                renderItem={({item}) => <ForecastItem forecast={item} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "whitesmkoke",
        justifyContent: "center",
        alignItems: "center"
    },
    location: {
        fontFamily: "InterReg",
        fontSize: 31
    },
    temp: {
        fontFamily: "InterBold",
        fontSize: 150,
        color: "grey"
    }
});

export default WeatherScreen