class User {
  static getName(req, rsp) {
    const query = req.query;
    const params = req.params;
    console.log('query', query, 'params', params);
    rsp.json({
      success: true,
      data: {
        name: `User ${params.id}`
      }
    });
  }
  static saveAge(req, rsp) {
    rsp.json({
      success: true,
      data: {
        age: Number(req.body.age || 0) + 10
      }
    });
  }
  static getNameJSONP(req, rsp) {
    rsp.jsonp({
      success: false,
      errMsg: 'jsonp Error',
      data: {
        name: `User ${req.query.name}`
      }
    });
  }
}

module.exports = User;
