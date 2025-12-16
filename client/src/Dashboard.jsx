import './App.css'

export default function Dashboard({ onLogout }) {
  return (
    <div className='bem-vindo'>
      <h1>🎉 Bem-vindo!</h1>
      <p>Você entrou com sucesso.</p>
      <button onClick={onLogout} className='btn-item'>Sair</button>
    </div>
  );
}
