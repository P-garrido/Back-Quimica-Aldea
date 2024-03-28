import { Router } from "express";
import { OrdersProductsController } from "../controllers/order-product.js";


export const createOrdersProductsRouter = ({ ordersProductsModel }) => {

  const ordersProductsRouter = Router();

  const ordersProductsController = new OrdersProductsController({ ordersProductsModel });


  ordersProductsRouter.get('/', ordersProductsController.getAll);
  ordersProductsRouter.post('/', ordersProductsController.create);
  ordersProductsRouter.delete('/:idProd/:idOrder', ordersProductsController.delete);

  return ordersProductsRouter
}