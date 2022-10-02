import { compare, genSalt, hash } from "bcryptjs";
import { Router } from "express";
import Joi from "joi";

import { failedResponse, successResponse } from "../helpers/response";
import { genToken } from "../helpers/token";
import validateRequest from "../middlewares/validateRequest";
import UserModel from "../models/UserModel";

const authRoute = Router();

authRoute.post(
  "/signup",
  validateRequest({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8),
  }),
  async (req, res) => {
    try {
      const salt = await genSalt();
      const hashedPw = await hash(req.body["password"], salt);

      const usrModel = new UserModel({
        name: req.body["name"],
        email: req.body["email"],
        password: hashedPw,
      });

      const usr = await usrModel.save();
      const tk = genToken(usr.email);

      return res.json(successResponse({ token: tk }));
    } catch (err: any) {
      return res.status(500).json(failedResponse(err["message"]));
    }
  }
);

authRoute.post(
  "/login",
  validateRequest({
    email: Joi.string().email().required(),
    password: Joi.string().min(8),
  }),
  async (req, res) => {
    try {
      const usr = await UserModel.findOne({ email: req.body["email"]! });
      if (!usr) {
        return res.status(401).json(failedResponse("account does not exist"));
      }

      const validPw = await compare(req.body["password"], usr.password);
      if (!validPw) {
        return res.status(401).json(failedResponse("incorrect password"));
      }

      const tk = genToken(usr.email);

      return res.json(successResponse({ token: tk }));
    } catch (err: any) {
      return res.status(500).json(failedResponse(err["message"]));
    }
  }
);

export default authRoute;
