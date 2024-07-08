"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const sequelize = new sequelize_1.Sequelize(config_1.default.development.database || 'postgres', config_1.default.development.username || 'postgres', config_1.default.development.password || 'postgres', {
    host: config_1.default.development.host || 'db',
    dialect: config_1.default.development.dialect || 'postgres',
});
exports.default = sequelize;
