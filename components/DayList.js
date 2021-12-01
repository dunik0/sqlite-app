import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DayList({ data, toggleDay }) {
  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  // console.log(data);

  const dayItems = days.map((day) => {
    const isActive = data[day] == 'true';
    return (
      <TouchableOpacity
        style={[
          styles.background,
          { backgroundColor: isActive ? 'black' : null },
        ]}
        onPress={() => {
          toggleDay(data.id, day);
        }}
        key={data.id + day}
      >
        <Text style={[styles.text, { color: isActive ? 'white' : 'black' }]}>
          {day[0].toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  });

  return <View style={styles.row}>{dayItems}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 25,
  },
  background: {
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
