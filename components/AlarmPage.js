import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Animated,
} from 'react-native';
import AlarmList from './AlarmList';
import plusIcon from '../assets/plus-icon.png';
import Database from './Database';

const AlarmPage = ({ navigation }) => {
  const db = Database.openDatabase();
  const [alarms, setAlarms] = useState([]);

  const navigateToAddAlarm = () => {
    navigation.navigate('AddAlarm', { refreshAlarms: getAlarms });
  };

  const getAlarms = async () => {
    const newAlarms = await Database.getAll(db);
    setAlarms(newAlarms.rows._array);
    // console.log(newAlarms.rows._array);
  };

  const deleteAlarm = (id) => {
    const newAlarms = alarms.filter((item) => item.id !== id);
    Database.delete(db, id);
    setAlarms(newAlarms);
  };

  const toggleDay = (id, day) => {
    const newAlarms = [...alarms];
    // const alarm = newAlarms.find((item) => item.id == id);
    const index = newAlarms.findIndex((item) => item.id == id);
    newAlarms[index][day] = newAlarms[index][day] == 'false' ? 'true' : 'false';
    console.log(newAlarms[index][day]);
    Database.update(db, id, {
      column: day,
      value: newAlarms[index][day] == 'true',
    });
    setAlarms(newAlarms);
  };

  useEffect(() => {
    Database.createTable(db);
    getAlarms();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
        style={styles.button}
        onPress={navigateToAddAlarm}
      >
        <View style={styles.button}>
          <Image style={{}} source={plusIcon} />
        </View>
      </TouchableNativeFeedback>
      <ScrollView style={styles.scroll}>
        <AlarmList
          deleteAlarm={deleteAlarm}
          alarms={alarms}
          toggleDay={toggleDay}
        />
      </ScrollView>
    </View>
  );
};

export default AlarmPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  //   plus: {
  //     position: 'absolute',
  //     bottom: 50,
  //     alignSelf: 'center',
  //     zIndex: 2,
  //   },
  scroll: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    // zIndex: 0,
  },
  button: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    zIndex: 1,
  },
});
