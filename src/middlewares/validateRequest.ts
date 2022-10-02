import { Request, Response } from "express";
import Joi from "joi";

import { failedResponse } from "../helpers/response";

const validateRequest = (schema: any) => {
  const joi = Joi.object(schema);

  return function (req: Request, res: Response, next: Function) {
    const { error } = joi.validate(req.body);
    if (error) {
      return res.status(400).json(failedResponse(error.message));
    }

    next();
  };
};

export default validateRequest;
