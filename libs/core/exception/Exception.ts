import { RequestT } from "../request";
import { ResponseT } from "../response";
import { APIException } from "./APIException";

export class Exception {
  static async handle(
    req: RequestT,
    res: ResponseT,
    e: Error | APIException | unknown | any,
  ) {
    if (e.code) {
      res.status(400).json({
        code: e.code,
        error: e,
      });
    } else {
      res.status(500).json({
        code: 500,
        error: e,
      });
    }
  }
}