import { HttpStatus } from '@nestjs/common';
import { RequestT } from '../request';
import { ResponseT } from '../response';
import { APIException } from './APIException';
import { ErrorMessageKey, ErrorMessageT } from './lang';

export class Exception {
  static async handle(req: RequestT, e: Error | APIException | unknown | any) {
    if (!(e instanceof APIException)) {
      e = new APIException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ErrorMessageKey.UNKNOWN,
      );
    }
    throw e;
  }
}
