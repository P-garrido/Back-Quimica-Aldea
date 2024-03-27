import express, { json } from 'express';
import cors from 'cors';
import { createProductsRouter } from './routes/products.js';
import { ProductModel } from './models/products.js';
import sequelize from './models/db.js';


const app = express();

app.use(cors());
app.use(json());
app.use('images', express.static('src/public'));


app.use('/products', createProductsRouter({ productsModel: ProductModel }));





(async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();



app.listen(3000, () => {
  console.log("app listening on port", 3000)
});