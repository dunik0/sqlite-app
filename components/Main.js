import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Database from './Database';
const Main = ({ navigation }) => {
  const navigateToAlarmPage = () => {
    navigation.navigate('Alarms');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToAlarmPage}>
      <Text style={styles.title}>SQLite App</Text>
      <Text style={styles.text}>Click to open alarms</Text>
    </TouchableOpacity>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
  },
  text: {
    fontSize: 18,
  },
});
