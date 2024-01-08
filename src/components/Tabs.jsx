/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import CurrentWeather from '../screens/CurrentWeather'
import UpcomingWeather from '../screens/UpcomingWeather'
import City from '../screens/City'
import ErrorItem from './ErrorItem'

import { useGetWeather } from '../hooks/useGetWeather'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  const [loading, error, weather] = useGetWeather()

  if (weather && weather.list) {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {
            backgroundColor: 'lightblue'
          },
          headerStyle: {
            backgroundColor: 'lightblue'
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: 'tomato'
          }
        }}
      >
        <Tab.Screen
          name={'Current'}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name={'droplet'}
                size={25}
                color={focused ? 'tomato' : 'black'}
              />
            )
          }}
        >
          {() => <CurrentWeather />}
        </Tab.Screen>
        <Tab.Screen
          name={'Upcoming'}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name={'clock'}
                size={25}
                color={focused ? 'tomato' : 'black'}
              />
            )
          }}
        >
          {() => <UpcomingWeather weatherData={weather.list} />}
        </Tab.Screen>
        <Tab.Screen
          name={'City'}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name={'home'}
                size={25}
                color={focused ? 'tomato' : 'black'}
              />
            )
          }}
        >
          {() => <City />}
        </Tab.Screen>
      </Tab.Navigator>
    )
  }

  return (
    <View style={styles.container}>
      {error ? <ErrorItem /> : <ActivityIndicator size="large" color="blue" />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default Tabs
