import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import TaskApp from './screens/taskapp';
import TankScreen from './screens/homescreen';
import Config from './screens/config';

const NavBar = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tanks">
        <Stack.Screen name="Tanks" component={TankScreen}/>
        <Stack.Screen name="Tasks" component={TaskApp}/>
        <Stack.Screen name="Config" component={Config}/>
      </Stack.Navigator>
    </NavigationContainer> 
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

export default NavBar;