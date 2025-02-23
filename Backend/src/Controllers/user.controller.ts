import { Request, Response } from "express";
import { userService } from "../Services/user.service";
import { UserDetails } from "../Models/user.interface";

let UserService = new userService();

export class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      let result = await UserService.registerUser(req.body);

      return res.status(201).json(result);
    } catch (error) {
      return res.json({
        error
      });
    }
  }

  async getAllUsers(req: Request, res: Response){
    try{
      let result = await UserService.fetchAllUsers()

      return res.status(200).json(result)
    }catch (error) {
      return res.json({
        error
      });
    }
  }

  async getSingleUser(req: Request, res: Response) {
    try {
      let { user_id } = req.params;
      let response = await UserService.fetchSingleUser(user_id);
      console.log(response);

      return res.status(200).json(response);
    } catch (error) {
      return res.json({
        error: "Error getting user",
      });
    }
  }

  async getSingleManager(req: Request, res: Response) {

    try {
      let { user_id } = req.params;
      let response = await UserService.fetchsinglemanager(user_id);
      console.log(response);

      return res.status(200).json(response);
    } catch (error) {
      return res.json({
        error: "Error getting manager",
      });
    }

  }

  async getManagers(req: Request, res:Response){
    try {
      let result = await UserService.fetchManagers();
      return res.status(200).json(result);
    } catch (error) {
      return res.json({
        error: "Error fetching managers",
      });
    }
  }

  async switchRoles(req: Request, res: Response) {
    try {
      let { user_id } = req.body;
      let response = await UserService.switchRoles(user_id);
      return res.status(200).json(response);
    } catch (error) { console.log(error);
    
      return res.json({
        error: "error switching roles to manager",
      });
    }
  }

  async switchRoles2(req: Request, res: Response) {
    try {
      let { user_id } = req.body;
      let response = await UserService.switchRoles2(user_id);
      return res.status(200).json(response);
    } catch (error) { console.log(error);
    
      return res.json({
        error: "error switching roles to employee",
      });
    }
  }
  

  async updateUser(req: Request, res: Response) {
    try {
      let email = req.params.email;
      let { password } = req.body;

      let user = {
        email: email,
        password,
      };

      let response = await UserService.updateUserDetails(email, password);
      return res.status(200).json(response);
    } catch (error) {
      return res.json({
        error: error,
      });
    }
  }

  async updateUserCredentials(req: Request, res: Response){

    try {
        let user_id = req.params.user_id
        let {username, email, password} = req.body

        let user= {
            user_id: user_id,
            username,
            email,
            password
        }
        let response = await UserService.updateUserCredentials(user)
        return res.status(200).json(response)
    } catch (error) {
        return res.json({
            error:error
        })
    }
}

async deleteUser(req: Request, res: Response){
  try {
    let {user_id} = req.params

    let response = await UserService.deleteUser(user_id)
    return res.status(200).json(response);

  } catch (error) {
      return res.json({
        error: 'Error updating status'
    })
  }
}



async reactiveUser(req: Request, res: Response){
  try {
    let {user_id} = req.params

    let response = await UserService.reactiveUser(user_id)
    return res.status(200).json(response);

  } catch (error) {
      return res.json({
        error: 'Error updating status'
    })
  }
}
}
