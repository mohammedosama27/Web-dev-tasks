var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/health', function(req, res, next) {
  res.status(200).send(
    {status: 'healthy',
      database_connection: 'connected',
      time: new Date().toISOString()
    }
  );
});

module.exports = router;
