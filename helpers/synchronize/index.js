const getDataFromServer = (data) => {
  if (Object.keys(data).length === 0) {
    console.log('No hay data');
    return false;
  }

  const dataBase = openDatabase('dbNovum', '1.0', 'Novum Database', 3 * 1024 * 1024);
  if (!dataBase) {
    alert('Lo sentimos, algo fue mal en la creacion de la base de datos local');
  } else {
    dataBase.transaction(function (tran) {
      tran.executeSql('DROP TABLE IF EXISTS material;');
      tran.executeSql('DROP TABLE IF EXISTS model_has_roles;');
      tran.executeSql('DROP TABLE IF EXISTS permissions;');
      tran.executeSql('DROP TABLE IF EXISTS roles;');
      tran.executeSql('DROP TABLE IF EXISTS role_has_permissions;');
      tran.executeSql('DROP TABLE IF EXISTS third;');
      tran.executeSql('DROP TABLE IF EXISTS tiquet;');
      tran.executeSql('DROP TABLE IF EXISTS user;');
      tran.executeSql('DROP TABLE IF EXISTS yard;');
      tran.executeSql('DROP TABLE IF EXISTS zone;');

      tran.executeSql('CREATE TABLE material (' +
        'id int(20) NOT NULL PRIMARY KEY,' +
        'code varchar(10) NOT NULL,' +
        'name varchar(150) NOT NULL,' +
        'unit varchar(2) NOT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE model_has_roles (' +
        'role_id int(20) NOT NULL,' +
        'model_type varchar(125) NOT NULL,' +
        'model_id int(20) NOT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE permissions (' +
        'id int(20) NOT NULL PRIMARY KEY,' +
        'name varchar(125) NOT NULL,' +
        'guard_name varchar(125) NOT NULL,' +
        'is_function int(10) NOT NULL,' +
        'display_name varchar(125) NOT NULL,' +
        'offline int(10) NOT NULL,' +
        'general int(10) NOT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE roles (' +
        'id int(20) NOT NULL PRIMARY KEY,' +
        'name varchar(125) NOT NULL,' +
        'guard_name varchar(125) NOT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE role_has_permissions (' +
        'permission_id int(20) NOT NULL,' +
        'role_id int(20) NOT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE third (' +
        'id int(20) NOT NULL PRIMARY KEY,' +
        'nit int(20) NOT NULL,' +
        'name varchar(255) NOT NULL,' +
        'client id(1) NOT NULL,' +
        'associated id(1) NOT NULL,' +
        'supplier id(1) NOT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE tiquet (' +
        'id int(20) NOT NULL PRIMARY KEY,' +
        'type varchar(1) DEFAULT NULL,' +
        'origin_user int(20) DEFAULT NULL,' +
        'destiny_user int(20) DEFAULT NULL,' +
        'origin_yard int(20) DEFAULT NULL,' +
        'supplier varchar(255) DEFAULT NULL,' +
        'client varchar(255) DEFAULT NULL,' +
        'material int(20) DEFAULT NULL,' +
        'receipt_number varchar(50)DEFAULT NULL,' +
        'reference_number varchar(50) DEFAULT NULL,' +
        'start_date datetime DEFAULT NULL,' +
        'final_date datetime DEFAULT NULL,' +
        'license_plate varchar(50) DEFAULT NULL,' +
        'trailer_number varchar(50) DEFAULT NULL,' +
        'driver varchar(100) DEFAULT NULL,' +
        'origin_gross_weight decimal(8,2) DEFAULT NULL,' +
        'origin_tare_weight decimal(8,2) DEFAULT NULL,' +
        'origin_net_weight decimal(8,2) DEFAULT NULL,' +
        'destiny_gross_weight decimal(8,2) DEFAULT NULL,' +
        'destiny_tare_weight decimal(8,2) DEFAULT NULL,' +
        'destiny_net_weight decimal(8,2) DEFAULT NULL,' +
        'transportation_company varchar(255) DEFAULT NULL,' +
        'origin_observation varchar(200) DEFAULT NULL,' +
        'destiny_observation varchar(200) DEFAULT NULL,' +
        'origin_seal varchar(50) DEFAULT NULL,' +
        'destiny_seal varchar(50) DEFAULT NULL,' +
        'round_trip int(1) DEFAULT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE user (' +
        'id int(20) NOT NULL PRIMARY KEY,' +
        'name varchar(255) NOT NULL,' +
        'document_number varchar(50) NOT NULL,' +
        'phone varchar(50) NOT NULL,' +
        'password varchar(255) NOT NULL,' +
        'yard int(20) DEFAULT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE yard (' +
        'id int(20) NOT NULL,' +
        'code varchar(30) NOT NULL,' +
        'name varchar(100) NOT NULL,' +
        'zone int(20) DEFAULT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE zone (' +
        'id int(20) NOT NULL,' +
        'code varchar(10) NOT NULL,' +
        'name varchar(30) NOT NULL' +
        ');'
      );

      /* synchronize zones */
      const objectZone = data.zone;
      for (let i = 0; i < objectZone.length; i++) {
        tran.executeSql('INSERT INTO zone VALUES (?, ?, ?)',
          [
            objectZone[i].id,
            objectZone[i].code,
            objectZone[i].name
          ]
        );
      };

      /* synchronize materials */
      const objectMaterial = data.material;
      for (let i = 0; i < objectMaterial.length; i++) {
        tran.executeSql('INSERT INTO material VALUES (?, ?, ?, ?)',
          [
            objectMaterial[i].id,
            objectMaterial[i].code,
            objectMaterial[i].name,
            objectMaterial[i].unit
          ]
        );
      };

      /* synchronize users */
      const objectUser = data.user;
      for (let i = 0; i < objectUser.length; i++) {
        tran.executeSql('INSERT INTO user VALUES (?, ?, ?, ?, ?, ?)',
          [
            objectUser[i].id,
            objectUser[i].name,
            objectUser[i].documentNumber,
            objectUser[i].phoneNumber,
            objectUser[i].password,
            objectUser[i].yard
          ]
        );
      };

      /* synchronize model_has_roles */
      const objectModelHasRoles = data.model_has_roles;
      for (let i = 0; i < objectModelHasRoles.length; i++) {
        tran.executeSql('INSERT INTO model_has_roles VALUES (?, ?, ?)',
          [
            objectModelHasRoles[i].role,
            objectModelHasRoles[i].type,
            objectModelHasRoles[i].user
          ]
        );
      };

      /* synchronize permissions */
      const objectPermission = data.permission;
      for (let i = 0; i < objectPermission.length; i++) {
        tran.executeSql('INSERT INTO permissions VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            objectPermission[i].id,
            objectPermission[i].name,
            objectPermission[i].guardName,
            objectPermission[i].isFunction,
            objectPermission[i].displayName,
            objectPermission[i].offline,
            objectPermission[i].general
          ]
        );
      };

      /* synchronize role */
      const objectRole = data.roles;
      for (let i = 0; i < objectRole.length; i++) {
        tran.executeSql('INSERT INTO roles VALUES (?, ?, ?)',
          [
            objectRole[i].id,
            objectRole[i].name,
            objectRole[i].guardName
          ]
        );
      };

      /* synchronize third */
      const objectThird = data.third;
      for (let i = 0; i < objectThird.length; i++) {
        tran.executeSql('INSERT INTO third VALUES (?, ?, ?, ?, ?, ?)',
          [
            objectThird[i].id,
            objectThird[i].nit,
            objectThird[i].name,
            objectThird[i].client,
            objectThird[i].associated,
            objectThird[i].supplier
          ]
        );
      };

      /* synchronize yard */
      const objectYard = data.yard;
      for (let i = 0; i < objectYard.length; i++) {
        tran.executeSql('INSERT INTO yard VALUES (?, ?, ?, ?)',
          [
            objectYard[i].id,
            objectYard[i].code,
            objectYard[i].name,
            objectYard[i].zone
          ]
        );
      };

      /* synchronize rolePermission */
      const objectRolePermission = data.role_has_permissions;
      for (let i = 0; i < objectRolePermission.length; i++) {
        tran.executeSql('INSERT INTO role_has_permissions VALUES (?, ?)',
          [
            objectRolePermission[i].permission,
            objectRolePermission[i].role
          ]
        );
      };
    });
  }
};

const setDataToServer = () => {
};

const getTiquets = (data) => {
  const dataBase = openDatabase('dbNovum', '1.0', 'Novum Database', 3 * 1024 * 1024);
  if (!dataBase) {
    alert('Lo sentimos, algo fue mal en la conexion de la base de datos local');
  } else {
    dataBase.transaction(function (tran) {
      // const text = '%' + data.text + '%';
      const text = '%%';
      alert(text);
      tran.executeSql('SELECT reference_number, origin_yard FROM tiquet WHERE reference_number LIKE ?', [text], function (tran, data) {
        alert('dentro de sql');
        return (data.rows);
      });
    });
  }
  alert('fuera de sql');
};

export {
  getDataFromServer,
  setDataToServer,
  getTiquets
};
