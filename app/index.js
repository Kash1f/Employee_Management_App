import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const index = () => {
  return (
  <Redirect href="/(home)"/> //this will auto go into the layout and then target the stack screen
  )
}

export default index

const styles = StyleSheet.create({})

// "/"
//index.js will apear when we open the app as it is the home route