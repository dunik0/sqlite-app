import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableNativeFeedback,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import Database from './Database';
import deleteIcon from '../assets/delete-icon.png';
import expandIcon from '../assets/expand-icon.png';

const AlarmItem = ({ data, refreshAlarms }) => {
  const [height, setHeight] = useState(new Animated.Value(200));
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOn, setIsOn] = useState(data.isOn === 'true');
  const db = Database.openDatabase();

  const toggle = () => {
    const newHeight = !isExpanded ? 300 : 200;

    Animated.spring(height, {
      toValue: newHeight,
      useNativeDriver: false,
    }).start();

    setIsExpanded((prevState) => !prevState);
  };

  const deleteAlarm = () => {
    Database.delete(db, data.id);
    refreshAlarms();
  };

  const turnOnOrOff = () => {
    setIsOn((prevState) => !prevState);
    Database.update(db, data.id, { column: 'isOn', value: !isOn });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          height: height,
        }}
      >
        <View style={styles.row}>
          <Text style={styles.time}>{data.time}</Text>
          <Switch onValueChange={turnOnOrOff} value={isOn} />
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={deleteAlarm} style={styles.button}>
            <Image source={deleteIcon} style={styles.button}></Image>
          </TouchableOpacity>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
              'rgba(255,255,255,1)',
              true,
            )}
            style={styles.button}
            onPress={toggle}
          >
            <View style={styles.button}>
              <Image
                source={expandIcon}
                style={{
                  ...styles.button,
                  transform: isExpanded
                    ? [{ rotate: '180deg' }]
                    : [{ rotate: '0deg' }],
                }}
              ></Image>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View></View>
      </Animated.View>
    </View>
  );
};

export default AlarmItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    paddingHorizontal: 20,
  },
  time: {
    fontSize: 30,
  },
  button: {
    height: 50,
    width: 50,
    zIndex: 4,
  },
});
