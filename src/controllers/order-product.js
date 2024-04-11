import { ProductModel } from "../models/products.js";



export class OrdersProductsController {

  constructor({ ordersProductsModel }) {
    this.ordersProductsModel = ordersProductsModel
  }

  getAll = async (req, res) => {

    try {
      const ordersProducts = await this.ordersProductsModel.findAll({ include: [{ model: ProductModel }] });
      res.json(ordersProducts);
    }
    catch (err) {
      console.error(err);
      res.json({ error: err });
    }
  }

  create = async (req, res) => {

    try {
      const newOrderProduct = await this.ordersProductsModel.create({ idOrder: req.body.idOrder, idProd: req.body.idProd, quantity: req.body.quantity });
      res.json(newOrderProduct);
    }
    catch (err) {
      console.error(err);
      res.json({ error: err });
    }
  }


  delete = async (req, res) => {
    try {
      const idProd = req.params.idProd;
      const idOrder = req.params.idOrder;
      await this.ordersProductsModel.delete({ where: { idProd, idOrder } });
      res.json({ message: "Línea de pedido eliminada" });
    }
    catch (err) {
      console.error(err);
      res.json({ error: err });
    }
  }

}