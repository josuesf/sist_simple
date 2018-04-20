var express = require('express');
var multer = require('multer');
var ext = require('file-extension');
var bodyParser = require("body-parser");
var session = require('express-session');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})
var upload = multer({ storage: storage }).single('picture');
var app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.disable('x-powered-by');
app.use(session({ secret: '_secret_', cookie: { maxAge: 60 * 60 * 1000 }, saveUninitialized: false, resave: false }));
app.get('/', function (req, res) {
  if (!req.session || !req.session.authenticated) {
    res.redirect('/login');
  } else
    res.render('index', { title: 'iFacturacion',Cod_Usuarios:req.session.username,Nick:req.session.nick });
})
app.get('/login', function (req, res) {
  if (req.session && req.session.authenticated) {
    return res.redirect('/');
  }
  res.render('login.ejs', { title: 'iFacturacion - Usuarios' });
})
var { LOGIN_SQL } = require('./utility/exec_sp_sql')
app.post('/login', function (req, res) {
  LOGIN_SQL(req.body.usuario, req.body.password, function (e) {
    if (e.err) return res.render('login.ejs', { title: 'iFacturacion - Usuarios',err:e.err });
    req.session.authenticated = true;
    req.session.username = e.Cod_Usuarios
    req.session.nick = e.Nick
    return res.redirect('/');
  })
})
app.get('/logout', function (req, res) {
  delete req.session.authenticated;
  res.redirect('/');
});
//Routes
var usuarios_api = require('./routes/api-usuarios')
var cajas_api = require('./routes/api-cajas')
var modulos_api = require('./routes/api-modulos')
var sucursales_api = require('./routes/api-sucursales')
var perfiles_api = require('./routes/api-perfiles')
var parametros_api = require('./routes/api-parametros')
var empresa_api = require('./routes/api-empresa')
<<<<<<< HEAD
var categorias_api = require('./routes/api-categorias')
var turnos_api = require('./routes/api-turnos')
=======
var almacenes_api = require('./routes/api-almacenes')
var conceptos_api = require('./routes/api-conceptos')
>>>>>>> bba51c327875d2a53611775e43f659522a50880d
app.use('/usuarios_api', usuarios_api);
app.use('/cajas_api', cajas_api);
app.use('/modulos_api', modulos_api);
app.use('/sucursales_api', sucursales_api);
app.use('/perfiles_api', perfiles_api);
app.use('/parametros_api', parametros_api);
app.use('/empresa_api', empresa_api);
<<<<<<< HEAD
app.use('/categorias_api', categorias_api)
app.use('/turnos_api', turnos_api)
=======
app.use('/almacenes_api', almacenes_api);
app.use('/conceptos_api', conceptos_api);

>>>>>>> bba51c327875d2a53611775e43f659522a50880d
//Listen Server
var server = app.listen(3000, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);
  console.log('Escuchando en el puerto 3000');
})


// var reportingApp = express();
// app.use('/reporting', reportingApp);
// var jsreport = require('jsreport')({
//   express: { app :reportingApp, server: server },
//   appPath: "/reporting"
// });
// jsreport.init().catch(function (e) {
//   console.error(e);
// });