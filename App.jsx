import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import Tabs from './src/components/Tabs'
import { WEATHER_API_KEY } from '@env'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [error, setError] = useState(null)
  const [weather, setWeather] = useState([])

  const fetchWeatherData = async () => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
      )
      const data = await res.json()
      setWeather(data)
    } catch (e) {
      setError('Could not fetch weather')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setError('Permission to access location was denied')
      }

      let tempLocation = await Location.getCurrentPositionAsync({})
      setLat(tempLocation.coords.latitude)
      setLon(tempLocation.coords.longitude)
      await fetchWeatherData()
    })()
  }, [lat, lon])

  if (weather) {
    console.log(weather)
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default App
