import { StatusCodes } from "http-status-codes";
import { EntityNotFoundError, TypeORMError } from "typeorm";

export enum ApplicationErrorCode {
  INVALID_ARGUMENT,
  NOT_FOUND,
  ALREADY_EXISTS,
  UNAUTHENTICATED,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
}

export class ApplicationError extends Error {
  public readonly message: string;
  public readonly code: ApplicationErrorCode;
  public readonly type: string;

  constructor({
    message,
    code,
    type,
  }: {
    message: string;
    code: ApplicationErrorCode;
    type?: string;
  }) {
    super(message);
    this.message = message;
    this.code = code;
    if (type) this.type = type;
  }

  toHTTPStatusCode(): StatusCodes {
    switch (this.code) {
      case ApplicationErrorCode.INVALID_ARGUMENT:
        return StatusCodes.BAD_REQUEST;
      case ApplicationErrorCode.NOT_FOUND:
        return StatusCodes.NOT_FOUND;
      case ApplicationErrorCode.ALREADY_EXISTS:
        return StatusCodes.CONFLICT;
      case ApplicationErrorCode.UNAUTHENTICATED:
        return StatusCodes.UNAUTHORIZED;
      case ApplicationErrorCode.UNPROCESSABLE_ENTITY:
        return StatusCodes.UNPROCESSABLE_ENTITY;
      case ApplicationErrorCode.INTERNAL_SERVER_ERROR:
      default:
        return StatusCodes.INTERNAL_SERVER_ERROR;
    }
  }

  static fromORMError(err: TypeORMError): ApplicationError {
    if (err instanceof EntityNotFoundError) {
      return new ApplicationError({
        message: "Not Found",
        code: ApplicationErrorCode.NOT_FOUND,
      });
    }
    return new ApplicationError({
      message: "Internal Server Error",
      code: ApplicationErrorCode.INTERNAL_SERVER_ERROR,
    });
  }
}
