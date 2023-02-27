import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

export interface Response<T> {
  code: number;
  error: Error | undefined;
  message: string | undefined;
  data: T;
}

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) =>
        throwError(() => {
          console.log('Exception Intercepter ');
          return {
            code: err.code || 500,
            data: null,
            error: err,
            message: err.message,
          };
        }),
      ),
    );
  }
}
