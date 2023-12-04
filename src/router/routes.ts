import { Router } from "express";
import { createUser } from "../controllers/user/createUser";
import { listUser } from "../controllers/user/listuser";
import { validateBody } from "../middlewares/validateBody";
import { deleteUser } from "../controllers/user/deleteUser";
import { login } from "../controllers/user/login";
import { authUser } from "../middlewares/authUser";

export const routes: Router = Router();

routes.post('/login', login);
routes.post('/user', validateBody, createUser);

routes.use(authUser)

routes.get('/user', listUser);
routes.delete('/user/:id', deleteUser);
