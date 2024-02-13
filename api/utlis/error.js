// this is used when we need some custom error handler 

export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.status = statusCode;
  error.message = message;
  return error;
};
