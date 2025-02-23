import express from 'express';
import { UserController } from '../Controllers/user.controller';
import { loginUser } from '../Controllers/auth.controller';


const user_router = express.Router();
let controller = new UserController()

user_router.post('/register', controller.registerUser);
user_router.post('/login', loginUser);
user_router.get('/fetch-all-users', controller.getAllUsers)
user_router.get('/fetch-managers', controller.getManagers)
user_router.put('/switch-role', controller.switchRoles);
user_router.put('/switch-role2', controller.switchRoles2);
user_router.get('/getManager/:user_id', controller.getSingleManager)

user_router.get('/:user_id', controller.getSingleUser);
user_router.put('/:email', controller.updateUser)
user_router.put('/updateUser/:user_id', controller.updateUserCredentials)
user_router.put('/deactivate/:user_id', controller.deleteUser)
user_router.put('/reactive/:user_id', controller.reactiveUser)
export default user_router;