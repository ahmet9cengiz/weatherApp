import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { WEATHER_API_KEY } from '@env'
import { useRecoilState } from 'recoil'
import { weatherState } from '../state/atoms/weatherState'

export const useGetWeather = () => {
  const [loading, setLoading] = useState(true)
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [error, setError] = useState(null)
  const [weather, setWeather] = useRecoilState(weatherState)

  const fetchWeatherData = async () => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
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

  return [loading, error, weather]
}
