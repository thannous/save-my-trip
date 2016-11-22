var express =   require('express');

var router = express.Router();



router.route('/titi').get(function () {
  res.status(200)
});


module.exports = router;