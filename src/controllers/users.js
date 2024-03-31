import { generateToken, validateToken } from "../middlewares/token.js";


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
      const newUser = await this.usersModel.create({ nomUser: req.body.username, pass: req.body.password, adress: req.body.adress, phone: req.body.phone, mail: req.body.mail, type: req.body.type });
      if (newUser) {
        const payload = {
          userName: newUser.username,
          password: newUser.password,
        };
        const token = generateToken(payload);
        res.json({ token, newUser });
      } else {
        res.status(404).send({ message: 'user not found' });
      }
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
      await this.usersModel.update({ nomUser: req.body.nomUser, pass: req.body.pass, adress: req.body.adress, phone: req.body.phone, mail: req.body.mail, type: req.body.type },
        { where: { idUser } });
      res.json({ message: "Usuario actualizado" });
    }
    catch (err) {
      console.error(err);
      res.json({ error: err });
    }
  }


  login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const user = await this.usersModel.findOne({ where: { nomUser: username, pass: password } });


      if (user) {
        const payload = {
          userName: username,
          password: password,
        };
        console.log(payload)
        const token = generateToken(payload);
        res.json({ token, user });
      } else {
        res.status(404).send({ message: 'user not found' });
      }
    }

    catch (err) {
      res.json({ error: err })
    }
  }

}