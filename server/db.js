const mysql = require('mysql2');//importa a biblioteca que permite o node conversar com o mysql2

const connection = mysql.createConnection({//cria uma conexão com o banco usando os dados fornecidos
    host: process.env.DB_HOST,//essas informações estou vindo do meu .env
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) =>{//tenta a conexão com o banco passando uma função
    if(err) {//se der erro
        console.error('Erro ao conectar ao MySQL: ', err);
        return;
    }
    console.log('Conectado ao MySQL!');
});

module.exports = connection;//exporta a conexão