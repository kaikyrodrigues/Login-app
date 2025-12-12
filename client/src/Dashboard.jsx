export default function Dashboard({ onLogout }) {
  return (
    <div style={{ textAlign: "center", padding: 30 }}>
      <h1>🎉 Bem-vindo!</h1>
      <p>Você entrou com sucesso.</p>
      <button onClick={onLogout}>Sair</button>
    </div>
  );
}
