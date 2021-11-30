import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Database from './Database';
import plusIcon from '../assets/plus-icon.png';

const AddAlarm = ({ navigation, route }) => {
  const db = Database.openDatabase();

  const addAlarm = () => {
    const newAlarm = {
      time: '00:00',
      isOn: true,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    };
    Database.add(db, newAlarm);
    route.params.refreshAlarms();
    navigation.navigate('Alarms');
  };
  return (
    <View style={styles.container}>
      <Text>"+" dodaje do bazy budzik z godziną 00:00</Text>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
        onPress={addAlarm}
        style={styles.button}
      >
        <View style={styles.button}>
          <Image source={plusIcon} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default AddAlarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: 100,
    height: 100,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'black',
    // backgroundColor: 'yellow',
  },
});
