const handleZodError = (err) => {
  const statusCode = 400;
  const message = 'Validation Error';
  
  const errorSources = err.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleZodError;
