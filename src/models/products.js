import { DataTypes } from 'sequelize';
import sequelize from './db.js';

export const ProductModel = sequelize.define(
  'Products',
  {
    idProd: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nameProd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameImg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  },
  {
    tableName: 'productos',
    timestamps: false,
  }
);