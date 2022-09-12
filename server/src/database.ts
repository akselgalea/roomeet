import mysql from 'mysql2';
import keys from './keys';

export const pool = mysql.createPool(keys.database);
export const promisePool = pool.promise();

pool.getConnection((err, conn) => {
    console.log('DB is connected');
});
