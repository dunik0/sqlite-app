import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/Main';
import AlarmPage from './components/AlarmPage';
import AddAlarm from './components/AddAlarm';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Alarms" component={AlarmPage} />
        <Stack.Screen name="AddAlarm" component={AddAlarm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
