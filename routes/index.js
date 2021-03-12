var express = require('express');
var router = express.Router();

let data = {
  title: 'Express', 
  nombre: 'Mateo',
  descripcion:'Esto es un sitio generado en NodeJS y Express, por Handelbars',
  edad:30,
}

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send('Esto es la home')
  res.render('index', {data, title:data.title});
  //render renderiza una vista -> .hbs -> .html dinamico
});

module.exports = router;
