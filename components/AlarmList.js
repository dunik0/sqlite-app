import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AlarmItem from './AlarmItem';

const AlarmList = ({ alarms, getAlarms }) => {
  const alarmItems = alarms.map((item) => (
    <AlarmItem refreshAlarms={getAlarms} data={item} key={item.id} />
  ));
  return <View style={styles.container}>{alarmItems}</View>;
};

export default AlarmList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // backgroundColor: 'red',
  },
});
