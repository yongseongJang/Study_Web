import { Request } from "express";

interface RequestWithUser extends Request {
  [key: string]: any;
}

export default RequestWithUser;
