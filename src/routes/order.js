import { Router } from "express";
import { OrdersController } from "../controllers/order.js";


export const createOrdersRouter = ({ ordersModel }) => {

  const ordersRouter = Router();

  const ordersController = new OrdersController({ ordersModel });


  ordersRouter.get('/', ordersController.getAll);

  return ordersRouter
}