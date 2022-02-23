module.exports = (res, statusCode, message, args = {}) => {
  res.status(statusCode).send({
    message: message,
    ...args
  });
}