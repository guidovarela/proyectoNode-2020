var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs')
var bodyParser = require('body-parser')



//MySQL
var db = require('./config/db')

db.authenticate()
  .then(
    () => {
      console.log("Conexion a MySQL Exitosa :)");
    }
  )
  .catch(
    (error) => {
      console.log("Error en la conexion :(" + error);
    }
  )


//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactoRouter = require('./routes/contacto')
var productosRouter = require('./routes/productos')
var noticiasRouter = require('./routes/noticias')

var app = express();

app.use(bodyParser.text({ type: 'text/html' }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//registrar Partials
hbs.registerPartials( __dirname + '/views')
// hbs.registerPartials('./views')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//definir el path de la ruta
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacto', contactoRouter)
app.use('/productos', productosRouter)
app.use('/noticias', noticiasRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
