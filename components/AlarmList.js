import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AlarmItem from './AlarmItem';

const AlarmList = ({ alarms, deleteAlarm, toggleDay }) => {
  const alarmItems = alarms.map((item) => (
    <AlarmItem
      removeAlarm={deleteAlarm}
      data={item}
      toggleDay={toggleDay}
      key={item.id}
    />
  ));
  return <View style={styles.container}>{alarmItems}</View>;
};

export default AlarmList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    // backgroundColor: 'red',
  },
});
