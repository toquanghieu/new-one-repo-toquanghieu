import {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { StatusCodes } from "http-status-codes";
import { ValidateError } from "tsoa";
import { ApplicationError } from "../../middlewares/error/error";

export const startHandler = (
  req: ExRequest,
  _: ExResponse,
  next: NextFunction
): void => {
  if (req.path !== "/") {
    console.info(`START: ${req.method.toUpperCase()} ${req.path}`);
  }
  next();
};

export const errorHandler = (
  err: Error,
  _: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void => {
  if (err instanceof ValidateError) {
    console.warn(`Validation Error for ${_.path}:`, err.fields);
    return res.status(err.status).json({
      code: StatusCodes.BAD_REQUEST,
      message: err.fields,
    });
  }
  if (err instanceof ApplicationError) {
    console.error(`Application Error for ${_.path}:`, err);
    const code = err.toHTTPStatusCode();
    return res.status(code).json({
      code: code,
      message: err.message,
      type: err.type,
    });
  }
  if (err instanceof Error) {
    console.error(`Internal Error for ${_.path}:`, err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
  next();
};
