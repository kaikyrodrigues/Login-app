import { useState } from "react";
import './App.css'


export default function Register({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    if (!email || !password) return alert("Preencha todos os campos");

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        return alert(data.error || "Erro ao registrar");
      }

      alert("Usuário registrado com sucesso!");
      onSwitch(); // volta para login
    } catch (err) {
      console.error(err);
      alert("Erro no servidor");
    }
  }
  return(

          <div>
            <form className="form" onSubmit={handleRegister}>
          <div className="input">
            <label>Email:</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
            
          <div className="input">
            <label>Senha:</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="btn">
            <button className="btn-item" type="submit">Cadastrar</button>

            <button className="btn-item" type="button" onClick={onSwitch}>
              Voltar
            </button>
          </div>  

            
        </form>

          </div>
    )
}