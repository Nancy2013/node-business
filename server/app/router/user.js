const express = require('express');
const multer = require('multer');

const User = require('../ctrl/user');

const router = express.Router();
const upload = multer();

router.post('/fileUpload', upload.single('file'), (req, rsp) => {
  const file = req.file;
  const body = req.body;
  console.log(file, body);
  rsp.status(204).end();
});
router.get('/getNameJSONP', User.getNameJSONP);
router.get('/:id', User.getName);

router.post('/saveAge', User.saveAge);


module.exports = router;
