import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class QueryTransformPipe<T extends Type<any>> implements PipeTransform {
  async transform(value: T, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }

    return plainToInstance(metatype, value);
  }
}
