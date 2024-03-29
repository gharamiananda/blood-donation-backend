import { ZodError, ZodIssue } from 'zod';
import { TErrorDetails, TGenericErrorResponse } from '../interfaces/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorDetails: TErrorDetails = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  const allMessages =errorDetails?.map(it=>it?.message).join(" ")

  return {
    statusCode,
    message: allMessages,
    errorDetails,
  };
};

export default handleZodError;