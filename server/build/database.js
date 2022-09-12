"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisePool = exports.pool = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const keys_1 = __importDefault(require("./keys"));
exports.pool = mysql2_1.default.createPool(keys_1.default.database);
exports.promisePool = exports.pool.promise();
exports.pool.getConnection((err, conn) => {
    console.log('DB is connected');
});
