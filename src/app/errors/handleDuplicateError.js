const handleDuplicateError = (err) => {
  const match = err.message.match(/(["'])(\\?.)*?\1/);
  const extractedMessage = match && match[0] ? match[0] : 'Duplicate value';
  
  const statusCode = 400;
  const message = `${extractedMessage} already exists.`;
  
  const errorSources = [
    {
      path: '',
      message,
    },
  ];

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleDuplicateError;
