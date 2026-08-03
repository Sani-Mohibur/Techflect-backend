const handleValidationError = (err) => {
  const statusCode = 400;
  const message = 'Validation Error';
  
  const errorSources = Object.values(err.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleValidationError;
