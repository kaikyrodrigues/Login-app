import '../App.css'

export default function Cabecalho({ showRegister, onToggle }){
    return(
       <h1 className='cabecalho'
      onClick={onToggle}
      style={{ cursor: 'pointer' }}
    >
      {showRegister ? 'Inscrever-se' : 'Entrar / Login'}
    </h1>
    )
}