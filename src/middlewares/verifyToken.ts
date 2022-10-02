import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { failedResponse } from "../helpers/response";

const verifyToken = (req: Request, res: Response, next: Function) => {
  const tk = req.header("auth-token");
  if (!tk) {
    return res.status(401).json(failedResponse("access denied"));
  }

  try {
    const vrf = verify(tk, process.env["ACCESS_TOKEN_SECRET"]!);
    (req as any)["user"] = vrf;

    next();
  } catch (err: any) {
    return res.status(500).json(failedResponse(err["message"]));
  }
};

export default verifyToken;
