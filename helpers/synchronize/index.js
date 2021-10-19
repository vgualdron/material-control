import websql from 'websql-promisified';

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
        'id integer NOT NULL PRIMARY KEY,' +
        'code varchar(10) NOT NULL,' +
        'name varchar(150) NOT NULL,' +
        'unit varchar(2) NOT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE model_has_roles (' +
        'role_id integer NOT NULL,' +
        'model_type varchar(125) NOT NULL,' +
        'model_id int(20) NOT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE permissions (' +
        'id integer NOT NULL PRIMARY KEY,' +
        'name varchar(125) NOT NULL,' +
        'guard_name varchar(125) NOT NULL,' +
        'is_function int(10) NOT NULL,' +
        'display_name varchar(125) NOT NULL,' +
        'offline int(10) NOT NULL,' +
        'general int(10) NOT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE roles (' +
        'id integer NOT NULL PRIMARY KEY,' +
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
        'id integer PRIMARY KEY,' +
        'nit int(20) NOT NULL,' +
        'name varchar(255) NOT NULL,' +
        'client id(1) NOT NULL,' +
        'associated id(1) NOT NULL,' +
        'contractor id(1) NOT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE tiquet (' +
        'id integer PRIMARY KEY,' +
        'type varchar(2) DEFAULT NULL,' +
        'operation varchar(1) DEFAULT NULL,' +
        'user int(20) DEFAULT NULL,' +
        'origin_yard int(20) DEFAULT NULL,' +
        'destiny_yard int(20) DEFAULT NULL,' +
        'supplier int(20) DEFAULT NULL,' +
        'customer int(20) DEFAULT NULL,' +
        'material int(20) DEFAULT NULL,' +
        'receipt_number varchar(50) DEFAULT NULL,' +
        'referral_number varchar(50) DEFAULT NULL,' +
        'date date DEFAULT NULL,' +
        'time time DEFAULT NULL,' +
        'license_plate varchar(50) DEFAULT NULL,' +
        'trailer_number varchar(50) DEFAULT NULL,' +
        'driver varchar(100) DEFAULT NULL,' +
        'gross_weight decimal(8,2) DEFAULT NULL,' +
        'tare_weight decimal(8,2) DEFAULT NULL,' +
        'net_weight decimal(8,2) DEFAULT NULL,' +
        'conveyor_company int(20) DEFAULT NULL,' +
        'observation varchar(200) DEFAULT NULL,' +
        'seals varchar(50) DEFAULT NULL,' +
        'round_trip int(1) DEFAULT 0,' +
        'local_created_at date,' +
        'synchronize int(1) DEFAULT 1,' +
        'synchronized int(1) DEFAULT 0,' +
        'deleted int(1) DEFAULT 0' +
        ');'
      );
      tran.executeSql('CREATE TABLE user (' +
        'id integer NOT NULL PRIMARY KEY,' +
        'name varchar(255) NOT NULL,' +
        'document_number varchar(50) NOT NULL,' +
        'phone varchar(50) NOT NULL,' +
        'password varchar(255) NOT NULL,' +
        'yard int(20) DEFAULT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE yard (' +
        'id integer PRIMARY KEY,' +
        'code varchar(30) NOT NULL,' +
        'name varchar(100) NOT NULL,' +
        'zone int(20) DEFAULT NULL' +
        ');'
      );
      tran.executeSql('CREATE TABLE zone (' +
        'id integer PRIMARY KEY,' +
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
            objectThird[i].contractor
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

      /* synchronize tiquet */
      const objectTiquet = data.tiquet;
      for (let i = 0; i < objectTiquet.length; i++) {
        tran.executeSql('INSERT INTO tiquet VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
          [
            objectTiquet[i].id,
            objectTiquet[i].type,
            objectTiquet[i].operation,
            objectTiquet[i].user,
            objectTiquet[i].origin_yard,
            objectTiquet[i].destiny_yard,
            objectTiquet[i].supplier,
            objectTiquet[i].customer,
            objectTiquet[i].material,
            objectTiquet[i].receipt_number,
            objectTiquet[i].referral_number,
            objectTiquet[i].date,
            objectTiquet[i].time,
            objectTiquet[i].license_plate,
            objectTiquet[i].trailer_number,
            objectTiquet[i].driver,
            objectTiquet[i].gross_weight,
            objectTiquet[i].tare_weight,
            objectTiquet[i].net_weight,
            objectTiquet[i].conveyor_company,
            objectTiquet[i].observation,
            objectTiquet[i].seals,
            objectTiquet[i].round_trip,
            objectTiquet[i].local_created_at,
            0,
            1,
            0
          ]
        );
      };
    });
  }
};

async function getNotSynchronizedTiquets () {
  // const response = { status: '200', data: { message: 'Tiquet creado con éxito' } };
  const dataBase = openDatabase('dbNovum', '1.0', 'Novum Database', 3 * 1024 * 1024);
  const websqlPromise = websql(dataBase);
  if (!dataBase) {
    alert('Lo sentimos, algo fue mal en la conexion de la base de datos local');
  } else {
    return await new Promise((resolve, reject) => {
      websqlPromise.transaction((tx) => {
        tx.executeSql('SELECT t.id id, t.type type, t.material material, t.date date, t.time time, ' +
                        't.license_plate  license_plate, t.user user, t.driver driver, t.local_created_at local_created_at, ' +
                        't.gross_weight  gross_weight, t.tare_weight tare_weight, t.net_weight net_weight, ' +
                        't.conveyor_company conveyor_company, t.observation observation, t.round_trip round_trip, ' +
                        't.deleted deleted, t.synchronized synchronized, t.synchronize synchronize, ' +
                        '(CASE t.operation WHEN "" THEN NULL ELSE t.operation END) operation, t.user user, ' +
                        '(CASE t.origin_yard WHEN "" THEN NULL ELSE t.origin_yard END) origin_yard, ' +
                        '(CASE t.destiny_yard WHEN "" THEN NULL ELSE t.destiny_yard END) destiny_yard, ' +
                        '(CASE t.supplier WHEN "" THEN NULL ELSE t.supplier END) supplier, ' +
                        '(CASE t.customer WHEN "" THEN NULL ELSE t.customer END) customer, ' +
                        '(CASE t.receipt_number WHEN "" THEN NULL ELSE t.receipt_number END) receipt_number, ' +
                        '(CASE t.referral_number WHEN "" THEN NULL ELSE t.referral_number END) referral_number, ' +
                        '(CASE t.trailer_number WHEN "" THEN NULL ELSE t.trailer_number END) trailer_number, ' +
                        '(CASE t.seals WHEN "" THEN NULL ELSE t.seals END) seals, ' +
                        '(tc.nit || "/" || tc.name) customer_name, ' +
                        '(ts.nit || "/" || ts.name) supplier_name, ' +
                        '(tcc.nit || "/" || tcc.name) conveyor_company_name ' +
                      'FROM tiquet t ' +
                      'LEFT JOIN third tc ON t.customer = tc.id ' +
                      'LEFT JOIN third ts ON t.supplier = ts.id ' +
                      'LEFT JOIN third tcc ON t.conveyor_company = tcc.id ' +
                      'WHERE t.synchronize = ? ' +
                      'ORDER BY t.deleted DESC', [1]);
      }).then((results) => {
        console.log('OK');
        const result = [];
        for (let i = 0; i < results[0].rows.length; i++) {
          result.push(results[0].rows[i]);
        }
        console.log(results);
        resolve(result);
      }).catch(() => {
        console.log('ERROR');
        const response = { status: 500, data: { message: 'Error al obtener tiquets', errors: { sql: ['Se ha presentado un error de SQL'] } } };
        reject(response);
      });
    });
  }
}

async function getTiquets (data) {
  const dataBase = openDatabase('dbNovum', '1.0', 'Novum Database', 3 * 1024 * 1024);
  if (!dataBase) {
    alert('Lo sentimos, algo fue mal en la conexion de la base de datos local');
  } else {
    return await new Promise((resolve) => {
      dataBase.transaction(function (tran) {
        const text = '%' + (data?.text ? data.text : '') + '%';
        tran.executeSql('SELECT t.id id, CASE t.type ' +
                          'WHEN "D" THEN "DESPACHO " ' +
                          'WHEN "R" THEN "REMISIÓN"  ' +
                          'WHEN "C" THEN "COMPRA" ' +
                          'WHEN "V" THEN "VENTA" ' +
                          'WHEN "OC" THEN "OPERACIÓN CON CLIENTE" ' +
                          'WHEN "OP" THEN "OPERACIÓN CON PROVEEDOR" ' +
                          'END AS type, t.receipt_number, t.referral_number, ' +
                          'm.name material, t.license_plate license_plate, ' +
                          '(substr(t.date, 9, 2) || "/" || substr(t.date, 6, 2) || "/" || substr(t.date, 1, 4)) date ' +
                          'FROM tiquet t ' +
                          'LEFT JOIN material m ON t.material = m.id ' +
                          'WHERE (t.receipt_number LIKE ? OR t.referral_number LIKE ?) AND t.deleted <> 1', [text, text], function (tran, data) {
          const result = [];
          for (let i = 0; i < data.rows.length; i++) {
            result.push(data.rows[i]);
          }
          resolve(result);
        });
      });
    });
  }
}

async function getTiquet (id) {
  const dataBase = openDatabase('dbNovum', '1.0', 'Novum Database', 3 * 1024 * 1024);
  const websqlPromise = websql(dataBase);
  if (!dataBase) {
    alert('Lo sentimos, algo fue mal en la conexion de la base de datos local');
  } else {
    return await new Promise((resolve, reject) => {
      websqlPromise.transaction((tx) => {
        tx.executeSql('SELECT * FROM tiquet WHERE id = ?', [id]);
      }).then((results) => {
        const response = { data: results[0].rows[0], status: 200, statusText: 'OK' };
        resolve(response);
      }).catch(() => {
        const response = { status: 500, data: { message: 'Error al registrar tiquet', errors: { sql: ['Se ha presentado un error de SQL'] } } };
        reject(response);
      });
    });
  }
}

async function insertTiquet (data) {
  const dataBase = openDatabase('dbNovum', '1.0', 'Novum Database', 3 * 1024 * 1024);
  const websqlPromise = websql(dataBase);
  if (!dataBase) {
    alert('Lo sentimos, algo fue mal en la conexion de la base de datos local');
  } else {
    return await new Promise((resolve, reject) => {
      websqlPromise.transaction((tx) => {
        const date = new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date());
        tx.executeSql('INSERT INTO tiquet (type, operation, user, origin_yard, destiny_yard, supplier, customer, ' +
                        'material, receipt_number, referral_number, date, time, license_plate, trailer_number, ' +
                        'driver, gross_weight, tare_weight, net_weight, conveyor_company, observation, seals, ' +
                        'round_trip, local_created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
          data.type, data.operation, data.user, data.origin_yard, data.destiny_yard, data.supplier, data.customer,
          data.material, data.receipt_number, data.referral_number, data.date, data.time, data.license_plate,
          data.trailer_number, data.driver, data.gross_weight, data.tare_weight, data.net_weight, data.conveyor_company,
          data.observation, data.seals, data.round_trip, date.slice(6, 10) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2)
        ]);
      }).then((results) => {
        const response = { status: 200, data: { message: 'Tiquet creado con éxito' } };
        resolve(response);
      }).catch(() => {
        const response = { status: 500, data: { message: 'Error al registrar tiquet', errors: { sql: ['Se ha presentado un error de SQL'] } } };
        reject(response);
      });
    });
  }
}

async function updateTiquet (data) {
  console.log(data);
  const dataBase = openDatabase('dbNovum', '1.0', 'Novum Database', 3 * 1024 * 1024);
  const websqlPromise = websql(dataBase);
  if (!dataBase) {
    alert('Lo sentimos, algo fue mal en la conexion de la base de datos local');
  } else {
    return await new Promise((resolve, reject) => {
      websqlPromise.transaction((tx) => {
        tx.executeSql('UPDATE tiquet SET type = ?, ' +
                              'operation = ?, ' +
                              'user = ?, ' +
                              'origin_yard = ?, ' +
                              'destiny_yard = ?, ' +
                              'supplier = ?, ' +
                              'customer = ?, ' +
                              'material = ?, ' +
                              'receipt_number = ?, ' +
                              'referral_number = ?, ' +
                              'date = ?, ' +
                              'time = ?, ' +
                              'license_plate = ?, ' +
                              'trailer_number = ?, ' +
                              'driver = ?, ' +
                              'gross_weight = ?, ' +
                              'tare_weight = ?, ' +
                              'net_weight = ?, ' +
                              'conveyor_company = ?, ' +
                              'observation = ?, ' +
                              'seals = ?, ' +
                              'round_trip = ?, ' +
                              'synchronize = ? ' +
                      'WHERE id = ?', [
          data.type, data.operation, data.user, data.origin_yard, data.destiny_yard, data.supplier, data.customer,
          data.material, data.receipt_number, data.referral_number, data.date, data.time, data.license_plate,
          data.trailer_number, data.driver, data.gross_weight, data.tare_weight, data.net_weight, data.conveyor_company,
          data.observation, data.seals, data.round_trip, 1, data.id
        ]);
      }).then(() => {
        const response = { status: 200, data: { message: 'Tiquet actualizado con éxito' } };
        resolve(response);
      }).catch(() => {
        const response = { status: 500, data: { message: 'Error al actualizar tiquet', errors: { sql: ['Se ha presentado un error de SQL'] } } };
        reject(response);
      });
    });
  }
}

async function deleteTiquet (id) {
  const dataBase = openDatabase('dbNovum', '1.0', 'Novum Database', 3 * 1024 * 1024);
  const websqlPromise = websql(dataBase);
  if (!dataBase) {
    alert('Lo sentimos, algo fue mal en la conexion de la base de datos local');
  } else {
    return await new Promise((resolve, reject) => {
      websqlPromise.transaction((tx) => {
        tx.executeSql(('SELECT id, synchronized FROM tiquet WHERE id = ?'), [id]);
      }).then((results) => {
        let sql = '';
        if (results[0].rows.length > 0 && results[0].rows[0].synchronized === 1) {
          sql = 'UPDATE tiquet SET deleted = 1, synchronize = 1 WHERE id = ?';
        } else {
          sql = 'DELETE FROM tiquet WHERE id = ?';
        }
        websqlPromise.transaction((tx) => {
          tx.executeSql((sql), [id]);
        }).then(() => {
          const response = { status: 200, data: { message: 'Tiquet eliminado con éxito' } };
          resolve(response);
        }).catch(() => {
          const response = { status: 500, data: { message: 'Error al eliminar tiquet', errors: { sql: ['Se ha presentado un error de SQL'] } } };
          reject(response);
        });
      }).catch(() => {
        const response = { status: 500, data: { message: 'Error al eliminar tiquet', errors: { sql: ['Se ha presentado un error de SQL'] } } };
        reject(response);
      });
    });
  }
}

async function getYards (data) {
  // const response = { status: '200', data: { message: 'Tiquet creado con éxito' } };
  const dataBase = openDatabase('dbNovum', '1.0', 'Novum Database', 3 * 1024 * 1024);
  const websqlPromise = websql(dataBase);
  if (!dataBase) {
    alert('Lo sentimos, algo fue mal en la conexion de la base de datos local');
  } else {
    return await new Promise((resolve, reject) => {
      const text = '%' + (data?.text ? data.text : '') + '%';
      const yard = (data?.yard ? data.yard : 0);
      const excludedYard = (data?.excluded_yard ? data.excluded_yard : 0);
      websqlPromise.transaction((tx) => {
        tx.executeSql(('SELECT id, code, name FROM yard WHERE (code LIKE ? OR name LIKE ?) AND id <> ? AND id <> ? ' +
                      'UNION ' +
                      'SELECT id, code, name FROM yard WHERE id = ?'), [text, text, yard, excludedYard, yard]);
      }).then((results) => {
        const result = [];
        for (let i = 0; i < results[0].rows.length; i++) {
          result.push(results[0].rows[i]);
        }
        const response = { status: 200, data: result };
        resolve(response);
      }).catch(() => {
        const response = { status: 500, data: { message: 'Error al obtener patios', errors: { sql: ['Se ha presentado un error de SQL'] } } };
        reject(response);
      });
    });
  }
}

async function getThirds (data) {
  const dataBase = openDatabase('dbNovum', '1.0', 'Novum Database', 3 * 1024 * 1024);
  const websqlPromise = websql(dataBase);
  if (!dataBase) {
    alert('Lo sentimos, algo fue mal en la conexion de la base de datos local');
  } else {
    return await new Promise((resolve, reject) => {
      const text = '%' + (data?.text ? data.text : '') + '%';
      const third = data?.third ? data.third : 0;
      const customer = data.customer;
      const associated = data.associated;
      const contractor = data.contractor;
      websqlPromise.transaction((tx) => {
        tx.executeSql(('SELECT id, (nit||" / "||name) name FROM third WHERE (nit LIKE ? OR name LIKE ?) AND id <> ? AND client = ? AND associated = ? AND contractor = ? ' +
                      'UNION ' +
                      'SELECT id, (nit||" / "||name) name FROM third WHERE id = ?'), [text, text, third, customer, associated, contractor, third]);
      }).then((results) => {
        const result = [];
        for (let i = 0; i < results[0].rows.length; i++) {
          result.push(results[0].rows[i]);
        }
        const response = { status: 200, data: result };
        resolve(response);
      }).catch(() => {
        const response = { status: 500, data: { message: 'Error al obtener tercero', errors: { sql: ['Se ha presentado un error de SQL'] } } };
        reject(response);
      });
    });
  }
}

async function getMaterials (data) {
  const dataBase = openDatabase('dbNovum', '1.0', 'Novum Database', 3 * 1024 * 1024);
  const websqlPromise = websql(dataBase);
  if (!dataBase) {
    alert('Lo sentimos, algo fue mal en la conexion de la base de datos local');
  } else {
    return await new Promise((resolve, reject) => {
      const text = '%' + (data?.text ? data.text : '') + '%';
      const material = data?.material ? data.material : 0;
      websqlPromise.transaction((tx) => {
        tx.executeSql(('SELECT id, code, name FROM material WHERE (code LIKE ? OR name LIKE ?) AND id <> ? ' +
                      'UNION ' +
                      'SELECT id, code, name FROM material WHERE id = ?'), [text, text, material, material]);
      }).then((results) => {
        const result = [];
        for (let i = 0; i < results[0].rows.length; i++) {
          result.push(results[0].rows[i]);
        }
        const response = { status: 200, data: result };
        resolve(response);
      }).catch(() => {
        const response = { status: 500, data: { message: 'Error al obtener material', errors: { sql: ['Se ha presentado un error de SQL'] } } };
        reject(response);
      });
    });
  }
}

export {
  getDataFromServer,
  getNotSynchronizedTiquets,
  getTiquet,
  getTiquets,
  deleteTiquet,
  insertTiquet,
  updateTiquet,
  getYards,
  getThirds,
  getMaterials
};
