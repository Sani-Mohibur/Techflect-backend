const handleCastError = (err) => {
  const statusCode = 400;
  const message = `Invalid ${err.path}: ${err.value}.`;
  
  const errorSources = [
    {
      path: err.path,
      message,
    },
  ];

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleCastError;
