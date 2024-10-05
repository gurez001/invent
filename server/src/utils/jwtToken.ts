import { Response } from "express";
import { IUser } from "../models/userModel";

// -----------create token and save in  cookies
const sendToken = async (user: IUser, statusCode: number, res: Response) => {
  const token = await user.getJWT_token();
  //-------------   options for cookie

  const option = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    token,
    user,
  });
};

export default sendToken;
