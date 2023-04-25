import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { ExceptionResponse } from '@root/apps/dto/response';

export const ApiExceptionResponse = () => {
  return applyDecorators(
    ApiExtraModels(ExceptionResponse),
    ApiBadRequestResponse({
      schema: {
        $ref: getSchemaPath(ExceptionResponse),
      },
    }),
  );
};
