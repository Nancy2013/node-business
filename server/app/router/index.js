const userRouter = require('./user');

module.exports = (app) => {
  app.use(['/user'], userRouter);

  app.all('*', (req, rsp) => {
    rsp.status(404).json({
      errCode: 404,
      errMsg: 'Not Found'
    });
  });
};
