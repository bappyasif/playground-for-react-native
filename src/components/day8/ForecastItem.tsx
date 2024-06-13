import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Forecast } from '@/app/day8/weather'
import dayjs from 'dayjs'
import {BlurView} from "expo-blur"

type Props = {
    forecast: Forecast
}

const ForecastItem = ({forecast}: Props) => {
    return (
        <BlurView intensity={15} style={styles.container}>
            <Text style={styles.temp}>{Math.round(forecast.main.temp)} &deg;</Text>
            <Text style={styles.date}>{dayjs(forecast.dt * 1000).format("ddd ha")}</Text>
        </BlurView>
    )
}

export default ForecastItem

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "floralwhite",
        padding: 10,
        aspectRatio: 3 / 4,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderColor: "gainsboro",
        borderWidth: StyleSheet.hairlineWidth
    },
    temp: {
        fontFamily: "InterBold",
        fontSize: 35,
        color: "whitesmoke",
        marginVertical: 10
    },
    date: {
        fontFamily: "Inter",
        fontSize: 16,
        color: "floralwhite"
    }
})