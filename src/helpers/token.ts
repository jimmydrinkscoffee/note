import { sign } from "jsonwebtoken";

const genToken = (usrId: string) => {
  return sign(usrId, process.env["ACCESS_TOKEN_SECRET"]!);
};

export { genToken };
