const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const {
  port
} = require('./config');
const initRouter = require('./router');

const app = express();

app.use(logger('combined'));
app.use(express.static(path.resolve(__dirname, '../../', 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

initRouter(app);
if (app.get('env') === 'development') {
  app.use((err, req, rsp, next) => {
    rsp.status(500).json({
      success: false,
      errCode: 500,
      errMsg: err
    });
    next(err);
  });
}
app.listen(port, () => {
  console.log(`app listen in port: ${port}`);
});
