const mongoose = require('mongoose');

require('dotenv').config({path:'variables.env'});

//Conexão ao banco de dados
mongoose.connect(process.env.DATABASE, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify:false
});

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (error)=>{
    console.error("ERRO: "+error.message);
});

//Carregando os Models
//require('./models/Post'); //Carregando o Model Post



const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), ()=>{
    console.log("Servidor Rodando na Porta: "+server.address().port);
});