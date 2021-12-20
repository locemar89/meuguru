import { Router } from "express";

import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create)
usersRouter.get('/:filter?', usersController.show)
usersRouter.put('/:id', usersController.update)
usersRouter.delete('/:id', usersController.delete)


export default usersRouter;
