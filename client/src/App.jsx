import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import './App.css';
import Cabecalho from './components/Cabecalho';

export default function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  // chamada quando o login for bem-sucedido
  function handleLoginSuccess() {
    setIsLogged(true);
  }

  // logout simples
  function handleLogout() {
    setIsLogged(false);
    setShowRegister(false);
  }

  // se está logado mostramos o Dashboard (com logout)
  if (isLogged) {
    return (
      <div className="container">
        <Dashboard onLogout={handleLogout} />
      </div>
    );
  }

  // se não está logado, mostramos Login ou Register
  return (
    <div className="container">
      <Cabecalho showRegister={showRegister}
  onToggle={() => setShowRegister(!showRegister)} />
      {showRegister ? (
        <Register onSwitch={() => setShowRegister(false)} />
      ) : (
        <Login
          onSwitch={() => setShowRegister(true)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
