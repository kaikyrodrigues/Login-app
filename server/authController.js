const bcrypt = require("bcrypt");
const db = require("./db");

module.exports = {
  register: async (req, res) => {
    try {
      const { login, password } = req.body; // login = email enviado

      if (!login || !password) {
        return res.status(400).json({ error: "Login e senha são obrigatórios" });
      }

      // Verificar se já existe o email
      const [rows] = await db.promise().query(
        "SELECT * FROM users WHERE email = ?",
        [login]
      );

      if (rows.length > 0) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      // Criptografar senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Inserir usuário
      await db.promise().query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [login, hashedPassword]
      );

      res.json({ message: "Usuário registrado com sucesso!" });

    } catch (err) {
      console.error("Erro no /register:", err);
      res.status(500).json({ error: "Erro no servidor" });
    }
  },

  login: async (req, res) =>{
    try{
        const {login, password} = req.body;//recebe login e senha no corpo da requisição 

        if(!login || !password){//se os dados estiverem vazios retorna um erro
            return res.status(400).json({ error: "Login e senha são obrigatórios" });
        }

        const [rows] = await db.promise().query(//busca o usuario no banco
            "SELECT * FROM users WHERE email = ?",
        [login]
        );

        if(rows.length === 0){//se não encontrar retorna um erro
            return res.status(400).json({ error: "Usuário não encontrado" });
        }

        const user = rows[0];

        // Comparar a senha enviada com a criptografada
        const passwordMatch = await bcrypt.compare(password, user.password);
        // bcrypt.compare faz: aplica o mesmo salt e algoritmo e verifica igualdade
        // é uma operação assíncrona e lenta por propósito (proteção contra brute force)

        if(!passwordMatch){//se a senha não bater retorna um erro
            return res.status(400).json({error: "Senha incorreta"});

        }

        res.json({message: "Login realizado com sucesso"});//se a senha bater
    }
    catch (err){
        console.error("Erro no /login", err);
        res.status(500).json({error: "Erro no servidor"});
    }
  }
};
