require('dotenv').config();//carrega as variaveis do .env
const express = require('express');//importa o express
const cors = require('cors');//libera o backend ser acessado pelo front
const db = require('./db');//importa a conexão
const app = express();//importa o express

const authController = require('./authController');//importa o controler

app.use(express.json());//permite receber json nas requisições 

app.use(cors());//permite requisições de outros dominios como meu front

//rota inicial para testar o servidor

app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});
app.post('/register', authController.register);//chama a função do authController
app.post('/login', authController.login);

app.listen(3000, () =>{
    console.log("Servidor rodando na porta 3000")
});

