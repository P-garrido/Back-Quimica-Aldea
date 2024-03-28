


export class OrdersController {

  constructor({ ordersModel }) {
    this.ordersModel = ordersModel
  }

  getAll = async (req, res) => {

    try {
      const orders = await this.ordersModel.findAll();
      res.json(orders);
    }
    catch (err) {
      console.error(err)
    }
  }

}