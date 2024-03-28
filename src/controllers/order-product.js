


export class OrdersProductsController {

  constructor({ ordersProductsModel }) {
    this.ordersProductsModel = ordersProductsModel
  }

  getAll = async (req, res) => {

    try {
      const ordersProducts = await this.ordersProductsModel.findAll();
      res.json(ordersProducts);
    }
    catch (err) {
      console.error(err)
    }
  }

}