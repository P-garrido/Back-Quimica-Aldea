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
      allowNull: false,
      autoIncrement: false
    },
    ammount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  },
  {
    tableName: 'Pedidos',
    timestamps: false
  }
);

