import { Router } from "express";
import { ProductsController } from "../controllers/products.js";
import { upload } from "../middlewares/multer.js";


export const createProductsRouter = ({ productsModel }) => {
  const productsRouter = Router();

  const productsController = new ProductsController({ productsModel });

  productsRouter.get('/', productsController.getAll);
  productsRouter.post('/', upload.single('file'), productsController.create);
  productsRouter.delete('/:id/:nameImg', productsController.delete);
  productsRouter.patch('/:id', productsController.update);


  return productsRouter;
};

