import { Router } from "express";
import { UsersController } from "../controllers/users.js";


export const createUsersRouter = ({ usersModel }) => {

  const usersRouter = Router();

  const usersController = new UsersController({ usersModel });


  usersRouter.get('/', usersController.getAll);
  usersRouter.get('/:id', usersController.getById);
  usersRouter.delete('/:id', usersController.delete);
  usersRouter.patch('/:id', usersController.update);


  return usersRouter


}