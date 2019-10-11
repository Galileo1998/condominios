var express = require('express');
var router = express.Router();
var fileModel = require('../filemodel');

var conCollection = fileModel.getCondominios();

router.get('/', function (req, res) {
  res.json({
    "entity": "condominios",
    "version": "0.0.1"
  });
}); //get

router.get('/all', function(req, res){
    conCollection = fileModel.getCondominios();
    res.json(conCollection);
  }); // get /all

module.exports = router;