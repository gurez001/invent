import { NextFunction, Request, Response } from "express";
import UserService from "../../services/userService";
import AsyncHandler from "../../middlewares/AsyncHandler";
import ErrorHandler from "../../utils/ErrorHandler";
import sendToken from "../../utils/jwtToken";

class UserController {
  constructor(private userService: UserService) {}
  logout = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const option: any = {
        expires: new Date(),
        path: "/",
        secure: true, // accessible through HTTP
        httpOnly: true, // only server can access the cookie
        sameSite: "none", // enforcement type
        partitioned: false,
      };
      res.status(200).cookie("token", null, option).json({
        success: true,
      });
    }
  );
  register = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await this.userService.registerUser(req.body, next);
      res.status(201).json({ succes: true, user });
    }
  );
  profile = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({ succes: true });
    }
  );

  login = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);
      const { email, password } = req.body;
      const user = await this.userService.authenticateUser(
        email,
        password,
        next
      );
      if (!user) {
        return next(new ErrorHandler("Invalid credentials", 404));
      }
      await sendToken(user, 200, res);
    }
  );

  getAllUsers = AsyncHandler.handle(async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.status(200).json({ users });
  });

  getUserById = AsyncHandler.handle(async (req: Request, res: Response) => {
    const user = await this.userService.getUserById(req.params.id);
    res.status(200).json({ user });
  });

  updateUser = AsyncHandler.handle(async (req: Request, res: Response) => {
    const user = await this.userService.updateUser(req.params.id, req.body);
    res.status(200).json({ user });
  });

  deleteUser = AsyncHandler.handle(async (req: Request, res: Response) => {
    await this.userService.deleteUser(req.params.id);
    res.status(204).send();
  });
}

export default UserController;
