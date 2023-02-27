import { RequestT } from '../request';
import { ResponseT } from '../response';
import { APIException } from './APIException';

export class Exception {
  static async handle(
    req: RequestT,
    res: ResponseT,
    e: Error | APIException | unknown | any,
  ) {
    return e;
  }
}
