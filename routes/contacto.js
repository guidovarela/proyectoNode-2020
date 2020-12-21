var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize')
var db = require('../config/db')
var nodemailer = require('nodemailer')
var transporter = require('../config/smtp')


//titulo
let title = "Contacto"

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contacto',{seccion:'Contacto',title,acceso:true});
});

router.post('/', async function(req, res, next){
  //Verificar que los datos del form se leyeron
  // console.log(req.body.nombre)
  // console.log(req.body.email)
  // console.log(req.body.mensaje)

  //destructuring -> las constantes se definen por medio del array
  //const {nombre, email, mensaje} = req.body

  let nombre = req.body.nombre
  let email = req.body.email
  let mensaje = req.body.mensaje
  
  //validacion
  let errores = []
  if(nombre === ""){
    errores.push({error: "Debe completar el nombre"})
  }
  if(email === ""){
    errores.push({error: "Debe completar el email"})
  }
  if(mensaje === ""){
    errores.push({error: "Debe completar el mensaje"})
  }
    
  if(errores.length > 0){
    //si hay errores, carga la vista con los mensajes 
    res.render('contacto',{errores,nombre,email,mensaje,title})
  
  }else{

      //Model
      const envioForm = db.define('contactos', {
        //cada atributo -> cada campo
          id: {
            type: Sequelize.NUMBER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
          },
          nombre: {
            type: Sequelize.STRING
          },
          email: {
            type: Sequelize.STRING
          }, 
          mensaje: {
            type: Sequelize.TEXT
          }
      });
  
      // router.get('/', async function(req,res){
        
        //realiazamos la consulta MySQL
      try {
        //INSERT INTO 'contactos' VALUES(0,nombre,email,mensaje)
        const datosForm = await envioForm.create({
          nombre:nombre,
          email:email,
          mensaje:mensaje,
        });
        
        //Enviar la info del formulario por email
        async function main() {
          //creamos el transporter o lo importamos desde "config"
          /*  let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: "guido.varela@gmail.com", // user del correo
                pass: "lsiewybmcyfnpxee", // password del correo -> si es Gmail, usar una contraseña de aplicacion
              },
            });*/

            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: `"${nombre}" <${email}>`, // sender address
              to: "consultas@domino.com", // list of receivers
              subject: "Nuevo Correo ✔", // Subject line
              html: `<b>Nuevo Mensaje</b><hr>Nombre: ${nombre}<br>Email: ${email} <br>Mensaje: ${mensaje} <hr>`, // html body
            });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          //definimos los datos a enviar -> cuerpo del mensaje

          //


        }
        main();


        res.render('formenviado',{nombre,email,mensaje});

        




      } catch (error) {
          console.log(error)
          // res.render('error',{error,message:"Hubo un error en la comunicacion con la base de datos"})
      }
          

        
    // })

  }
  
})


module.exports = router;
