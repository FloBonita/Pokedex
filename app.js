const express = require('express'); //Pacote Express
const mongoose = require('mongoose'); //Manipula as requisições com MongoDB
const mustache = require('mustache-express'); //Framework para htmml
const coockieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const router = require('./routes/index'); //Rotas do Site
const helpers = require('./helpers'); //Arquivo contendo conteudos de apoio
const errorHandler = require('./handlers/errorHandler'); //Importando o Handler do 404


//Configuções
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));


app.use(express.static(__dirname+'/public'));


app.use(coockieParser(process.env.SECRET));
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    res.locals.h = { ...helpers };
    res.locals.flashes = req.flash();
    res.locals.user = req.user;

    // if(req.isAuthenticated()){
    //     //Filtrar menu para Guest ou Logged
    //     res.locals.h.menu = res.locals.h.menu.filter(i=>i.logged);
    // }else{
    //     //Filtrar menu so pra guest
    //     res.locals.h.menu = res.locals.h.menu.filter(i=>i.guest);
    // }

    next(); 
});
 

const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use('/', router);

app.use(errorHandler.notFound);

//View Engine Aplication
app.engine('mst', mustache(__dirname+'/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');


module.exports = app;