


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
      console.error(err);
      res.json({ error: err });
    }
  }

  create = async (req, res) => {
    try {
      const newOrder = this.ordersModel.create({ date: req.body.date, idUser: req.body.idUser, ammount: req.body.ammount, adress: req.body.adress, phone: req.body.phone, mail: req.body.mail, name: req.body.name });
      res.status(201).json(newOrder);
    }
    catch (err) {
      console.error(err);
      res.json({ error: err });
    }
  }


  delete = async (req, res) => {
    try {
      const idOrder = req.params.id;
      await this.ordersModel.destroy({ where: { idOrder } });
      res.json({ message: "Orden eliminada" });
    }
    catch (err) {
      console.error(err);
      res.json({ error: err });
    }
  }


  update = async (req, res) => {

    try {
      const idOrder = req.params.id;
      await this.ordersModel.update({ date: req.body.date, idUser: req.body.idUser, ammount: req.body.ammount, adress: req.body.adress, phone: req.body.phone, mail: req.body.mail, name: req.body.name },
        { where: { idOrder } });
      res.json({ message: "Orden actualizada" });
    }
    catch (err) {
      console.error(err);
      res.json({ error: err });
    }
  }



}