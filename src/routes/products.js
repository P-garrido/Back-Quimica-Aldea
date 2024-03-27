import { Router } from "express";
import { ProductsController } from "../controllers/products.js";


export const createProductsRouter = ({ productsModel }) => {
  const productsRouter = Router();

  const productsController = new ProductsController({ productsModel });

  productsRouter.get('/', productsController.getAll);


  return productsRouter;
};

