import sequelize from "./db.js";
import { DataTypes } from "sequelize";
import { OrdersModel } from "./order.js";
import { ProductModel } from "./products.js";


export const OrderProductsModel = sequelize.define(
  'OrderProducts',
  {
    idOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idProd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    adress: {
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
  },
  {
    tableName: 'ProductosPedidos',
    timestamps: false
  }
);


OrdersModel.hasMany(OrderProductsModel, { foreignKey: 'idOrder' });
OrderProductsModel.belongsTo(ProductModel, { foreignKey: 'idProd' });