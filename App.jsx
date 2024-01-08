import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { RecoilRoot } from 'recoil'
import Tabs from './src/components/Tabs'
import { useGetWeather } from './src/hooks/useGetWeather'
import ErrorItem from './src/components/ErrorItem'

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </RecoilRoot>
  )
}

export default App
