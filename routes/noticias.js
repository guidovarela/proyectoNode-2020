var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize')
var db = require('../config/db')


//Definir el model de la consulta (de los datos)
const Noticias = db.define('noticias', {
  // Model attributes are defined here
  //cada atributo -> cada campo
  id: {
    type: Sequelize.NUMBER,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  titulo: {
    type: Sequelize.STRING
  },
  subtitulo:Sequelize.TEXT,
  contenido:Sequelize.TEXT,
  imagen:Sequelize.STRING,
  autor:Sequelize.STRING,
});

//Titulo de la pagina
let title = 'Noticias'
let fecha = new Date()

//realizar la consulta
//La consulta a MySQL se realiza con una llamada asincronica -> async / await
router.get('/', async function(req,res){
  //realiazamos la consulta MySQL
  const cargarNoticias = await Noticias.findAll({
    //SELECT id, titulo, contenido FROM ...
    attributes: ['id','titulo','imagen','contenido'],
    
    //SELECT id, titulo, contenido FROM table WHERE id = '3'
    // where: {
    //   id: "3"
    // }
  })
  //INSERT -> create()

  // console.log(cargarNoticias)
  //enviamos los datos a la vista
  res.setHeader('content-type', 'text/html');
  res.render('noticias',{
    noticias:cargarNoticias,
    title,
    dia:fecha.getDate(),
    mes:fecha.getMonth()+1,
    anio:fecha.getFullYear(),
  })
})

//renderizar 1 sola noticias
router.get('/:id',async function(req,res){

  let paramid = parseInt(req.params.id) 
  //hacer la consulta
  /*const noticia0 = await Noticias.findAll({
    //filtramos por id -> parametro == id
    where:{
      id: paramid
    }
  })*/
  //consulta MySQL
  const noticia = await Noticias.findAll({
    
  })
  //find() -> busqueda en el array de objetos, que devolvio mysql
  const noticiaSola = noticia.find(noticia => noticia.id == paramid)

  console.log(noticiaSola)
  //mandamos a la vista
  res.render('notiSingle',{noticia:noticiaSola,noticias:noticia,title})

})



module.exports = router;
