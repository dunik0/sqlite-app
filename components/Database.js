import * as SQLite from 'expo-sqlite';

export default class Database {
  static openDatabase() {
    return SQLite.openDatabase('alarms2.db');
  }

  static createTable(db) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS alarms (
            id integer primary key not null, 
            time text, 
            isOn boolean, 
            monday boolean, 
            tuesday boolean,  
            wednesday boolean,
            thursday boolean,
            friday boolean,
            saturday boolean,
            sunday boolean
        );`,
        [],
        (tx, results) => {
          console.log(JSON.stringify(results));
        },
        function (tx, error) {
          console.log(error);
        },
      );
    });
  }
  static add(db, newRecord) {
    const {
      time,
      isOn,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    } = newRecord;
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO alarms (
            time, isOn, monday, tuesday, wednesday,
            thursday, friday, saturday, sunday 
        ) values (
            '${time}', '${isOn}', '${monday}', 
            '${tuesday}', '${wednesday}', '${thursday}', 
            '${friday}', '${saturday}', '${sunday}')`,
        [],
        (tx, results) => {
          console.log(JSON.stringify(results));
        },
        function (tx, error) {
          console.log(error);
        },
      );
    });
  }
  static getAll(db) {
    const query = 'SELECT * FROM alarms';
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          query,
          [],
          (tx, results) => {
            resolve(results);
          },
          function (tx, error) {
            reject(error);
          },
        );
      }),
    );
  }
  static update(db, id, newValue) {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE alarms 
        SET ${newValue.column} = '${newValue.value}'
        WHERE id = ${id};`,
        [],
        (tx, results) => {
          console.log(JSON.stringify(results));
        },
        function (tx, error) {
          console.log(error);
        },
      );
    });
  }
  static delete(db, id) {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM alarms 
          WHERE id = ${id};`,
        [],
        (tx, results) => {
          console.log(JSON.stringify(results));
        },
        function (tx, error) {
          console.log(error);
        },
      );
    });
  }
}
