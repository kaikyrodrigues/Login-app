import { useState } from "react"
import './App.css'

export default function Login({ onSwitch, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    if (!email || !password) {
      return setMsg("Preencha todos os campos");
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return setMsg(data.error || "Erro ao fazer login");
      }
      alert("Login realizado com sucesso!");
      // login bem-sucedido
      onLoginSuccess(); // informa ao App que o usuário logou
    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor");
    }
  }
    
    return(
          
            <form className="form" onSubmit={handleSubmit}>
                <div className="input">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        name="email"
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input">
                    <label htmlFor="senha">Senha:</label>
                    <input 
                        type="password" 
                        name="senha" 
                        id="senha" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}/>
               
                </div>
                    
                <div className="btn">
                    <button className="btn-item" type="submit">Entrar</button>
                    <button className="btn-item" onClick={onSwitch}> Inscrever-se</button>
                </div>

                {/* 🔥 Aqui aparece a mensagem */}
                {msg && <p className="message">{msg}</p>}
            </form>
       
    )
}