import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import { BiSolidError  } from 'react-icons/bi'
import { Validacion } from '../Validacion'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, seterr] = useState(false);
  const { login } = useContext(AuthContext);
  const registrar = () => {
    navigate("/signup")
  }
  const inicio = (condicion)=>{
       if(condicion=== true)
       navigate('/inicio')
  }
  const handleLogin = async (e) => {
    e.preventDefault();
      await Validacion(username, password, seterr, login,inicio)
     
        
      
     
    // try {
    //   const response = await axios.post('http://localhost:3001/login', {
    //     username,
    //     password,
    //   });
  
    //   //console.log(response.data);
    //   if (response.data) {
       
    //     if(response.data.rol === "catador"){
    //       console.log(response.data.rol);
    //       conRol()
    //     }
    //     document.cookie = `token=${response.data.token}; path=/;`;
    //     seterr(false)
    //     login();
    //     //onLogin(); 
    //   }
    // } catch (error) {
    //   seterr(true)
    // }
  };
  
  return (
    <div className="container" style={{marginTop:'10%', backgroundColor:'#6B6B6B', maxWidth:'100%', paddingTop:'2vh', paddingBottom:'2vh', boxShadow: '0px 0px 30px 15px rgba(0,0,0,0.55)'}}>
      <div className="container" style={{backgroundColor:'#861521', width:'80vh', height:'60vh', borderRadius:'20px', borderColor:'white', borderWidth:'2px', borderStyle:'solid'}}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4" style={{marginTop: '25%', color:'white', fontSize:'6vh'}}>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3" style={{color:'white', fontSize:'2.5vh'}}>
              <label htmlFor="username" className="form-label">Correo</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{color:'white', fontSize:'2.5vh'}}>Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>{
                  err? <span className=' text-white'> <BiSolidError  /> Usuario o Contraseña incorrecta</span>: undefined
            }
            
            <div className="d-grid gap-2 mb-2">
              <button type="submit" className="btn btn-primary mt-4" style={{boxShadow: '0px 0px 13px 0px rgba(0,0,0,0.56)'}}>Iniciar sesión</button>
            </div>
            <Link className='text-blue' to='/signup'> registrar </Link>
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}