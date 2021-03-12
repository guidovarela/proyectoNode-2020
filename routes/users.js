var express = require('express');
var router = express.Router();

let user = [{
  title:"usuario",
  nombre: 'Eduardo',
  descripcion:'Esto es un sitio generado en NodeJS y Express, por Handelbars',
  edad:20,
  img:'user1.png'
},
{
  title:"usuario",
  nombre: 'Maria',
  descripcion:'Esto es un sitio generado en NodeJS y Express, por Handelbars',
  edad:30,
  img:'user2.png'
},{
  nombre:"Pedro",
  descripcion:"me gusta la programacion, el futbol y comprar dolares en el mercado negro",
  edad:21,
  img:'user1.png'
}]


/* GET users listing. */
router.get('/', (req, res, next) => {
  //res.send('respond with a resource');
  res.render('users', {user, title:user.title})
});

module.exports = router;
