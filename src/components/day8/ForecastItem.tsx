import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Forecast } from '@/app/day8/weather'

type Props = {
    forecast: Forecast
}

const ForecastItem = ({forecast}: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.temp}>{Math.round(forecast.main.temp)} &deg;</Text>
        </View>
    )
}

export default ForecastItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: "floralwhite",
        padding: 10,
        aspectRatio: 9 / 16,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    temp: {
        fontFamily: "InterBold",
        fontSize: 20,
        color: "grey"
    }
})