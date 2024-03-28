import sequelize from './db.js';
import { DataTypes } from 'sequelize';
import { OrdersModel } from './order.js';


export const UserModel = sequelize.define(
  'Users',
  {
    idUser: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nomUser: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'usuarios',
    timestamps: false,
  }
);

UserModel.hasMany(OrdersModel, { foreignKey: 'idUser' });
OrdersModel.belongsTo(UserModel, { foreignKey: 'idUser', onDelete: 'CASCADE' });