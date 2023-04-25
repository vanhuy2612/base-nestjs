import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Account } from '@prisma/client';

export class PaginatedResponse<TData> {
  @ApiProperty()
  status: HttpStatus;

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  @ApiProperty({ isArray: true })
  data: TData[];
}

export class ExceptionDTO {
  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;
}
export class ExceptionResponse {
  @ApiProperty()
  status: HttpStatus;

  @ApiProperty()
  path: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty({ type: ExceptionDTO })
  error: ExceptionDTO;
}
export class AccountDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  roleId: number;
}

export class LoginResponse {
  @ApiProperty()
  statusCode: HttpStatus;

  data: {
    token: string;
    permissions: string[];
  };
}

export type UserIndexResponse = {
  status: HttpStatus;
  data: Account[];
};

export type UserUpdateResponse = {
  status: HttpStatus;
  data: boolean;
};
