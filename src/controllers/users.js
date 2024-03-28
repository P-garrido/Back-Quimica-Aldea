


export class UsersController {

  constructor({ usersModel }) {
    this.usersModel = usersModel
  }

  getAll = async (req, res) => {

    try {
      const users = await this.usersModel.findAll();
      res.json(users);
    }
    catch (err) {
      console.error(err)
    }
  }

  getById = async (req, res) => {
    try {
      const idUser = req.params.id;

      const user = await this.usersModel.findOne({ where: { idUser } });

      if (!user) {
        res.status(404).json({ message: "Usuario no existente" });
      }
      else {
        res.json(user);
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  create = async (req, res) => {

    try {
      const newUser = await this.usersModel.create({ nomUser: req.body.nomUser, pass: req.body.pass, adress: req.body.adress, phone: req.body.phone, mail: req.body.mail });
      res.status(201).json(newUser);
    }
    catch (err) {
      console.error(err);
      res.json({ error: err });
    }
  }


  delete = async (req, res) => {

    try {
      const idUser = req.params.id;
      await this.usersModel.destroy({ where: { idUser } });
      res.json({ message: "Usuario eliminado" });
    }
    catch (err) {
      console.error(err);
      res.json({ error: err });
    }
  }

  update = async (req, res) => {

    try {
      const idUser = req.params.id;
      await this.usersModel.update({ nomUser: req.body.nomUser, pass: req.body.pass, adress: req.body.adress, phone: req.body.phone, mail: req.body.mail },
        { where: { idUser } });
      res.json({ message: "Usuario actualizado" });
    }
    catch (err) {
      console.error(err);
      res.json({ error: err });
    }
  }

}