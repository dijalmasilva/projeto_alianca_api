import { HttpStatus } from '@nestjs/common';

import { ErrorType } from '/types/ErrorType';

export const HttpException = (error: ErrorType, status: HttpStatus) =>
  HttpException(error, status);
