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

export class LoginDataDTO {
  @ApiProperty()
  token: string;

  @ApiProperty()
  permissions: string[];
}
export class LoginResponse {
  @ApiProperty()
  statusCode: HttpStatus;

  @ApiProperty({ type: LoginDataDTO })
  data: LoginDataDTO;
}

export class UserIndexResponse {
  @ApiProperty()
  status: HttpStatus;
  @ApiProperty()
  data: Account[];
}

export class UserUpdateResponse {
  @ApiProperty()
  status: HttpStatus;
  @ApiProperty()
  data: boolean;
}
