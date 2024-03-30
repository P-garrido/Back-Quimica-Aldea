import express, { json } from 'express';
import cors from 'cors';
import { createProductsRouter } from './routes/products.js';
import { ProductModel } from './models/products.js';
import sequelize from './models/db.js';
import { createUsersRouter } from './routes/users.js';
import { UserModel } from './models/users.js';
import { createOrdersRouter } from './routes/order.js';
import { OrdersModel } from './models/order.js';
import { createOrdersProductsRouter } from './routes/order-product.js';
import { OrderProductsModel } from './models/order-product.js';


const app = express();

app.use(cors());
app.use(json());
app.use('/images', express.static('src/public'));

(async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


app.use('/products', createProductsRouter({ productsModel: ProductModel }));
app.use('/users', createUsersRouter({ usersModel: UserModel }));
app.use('/orders', createOrdersRouter({ ordersModel: OrdersModel }));
app.use('/orderproducts', createOrdersProductsRouter({ ordersProductsModel: OrderProductsModel }));









app.listen(3000, () => {
  console.log("app listening on port", 3000)
});