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

router.post('/new', function(req, res){
    conCollection = fileModel.getCondominios();
    var newCondominios = Object.assign(
       {},
       req.body,
       {
           "nombre": req.body.nombre,
           "apartament": parseInt(req.body.apartament),
           "cuotaMensual": parseFloat(req.body.cuotaMensual)
       }
    );
    var condominiosExists = conCollection.find(
      function(o, i){
        return o.codigo === newCondominios.codigo;
      }
    )
    if( ! condominiosExists ){
      conCollection.push(newCondominios);
      fileModel.setCondominios(
         conCollection,
         function(err, savedSuccesfully){
           if(err){
             res.status(400).json({ "error": "No se pudo ingresar objeto" });
           } else {
             res.json(newCondominios);  // req.body ===  $_POST[]
           }
         }
       );
    } else {
      res.status(400).json({"error":"No se pudo ingresar objeto"});
    }
 }); // post /new
module.exports = router;