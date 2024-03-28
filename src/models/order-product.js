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
    }
  },
  {
    tableName: 'ProductosPedidos',
    timestamps: false
  }
);


OrdersModel.hasMany(OrderProductsModel, { foreignKey: 'idOrder', onDelete: 'CASCADE' });
OrderProductsModel.belongsTo(ProductModel, { foreignKey: 'idProd' });