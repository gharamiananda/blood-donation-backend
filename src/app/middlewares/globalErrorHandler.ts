/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import ApiError from '../errors/ApiError';
import handleZodError from '../errors/handleZodError';
import { TErrorDetails } from '../interfaces/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  console.log(err.code =='P2002',err,'global error handler');

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorDetails: TErrorDetails = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  }  else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorDetails = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorDetails = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorDetails:{issues :errorDetails},
    // err,
    // stack: config.env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
