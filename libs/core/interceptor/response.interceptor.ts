import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { APIException } from '../exception/APIException';

export interface Response<T> {
  code: number;
  error: Error | undefined;
  message: string | undefined;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof APIException) {
          return {
            code: data.code || 500,
            data: null,
            error: data,
            message: data.message,
          };
        }
        return {
          code: data?.code || 200,
          data: data,
          error: undefined,
          message: undefined,
        };
      }),
    );
  }
}
