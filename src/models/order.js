import sequelize from "./db.js";
import { DataTypes } from "sequelize";


export const OrdersModel = sequelize.define(
  'Orders',
  {
    idOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: false
    },
    ammount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    delivered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    tableName: 'Pedidos',
    timestamps: false
  }
);

