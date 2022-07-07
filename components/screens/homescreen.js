import React from 'react';
import {ScrollView, StyleSheet, Button} from 'react-native';
import AddTank from '../tank';

const TankScreen = ( {navigation} ) => {
  return (
  <ScrollView style={homeStyle.container}>
      <AddTank />
  </ScrollView>
  )
}

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasks: {
    flex: 1,
    height: 30,
    width: 30,
    backgroundColor: '#E8EAED',
  },
  });

export default TankScreen;