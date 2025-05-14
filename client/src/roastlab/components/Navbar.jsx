import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';

export const Navbar = () => {

    const navigate = useNavigate()
    const { logout, isAuthenticated } = useContext(AuthContext);

    const onLogout = () =>{
        // console.log('logout')
        if(isAuthenticated){
            logout();
            return navigate('/login',{
                replace: true
            })
        }
        
    }

    return (
        <nav className="navbar sticky-top navbar-expand-sm navbar-dark p-1" style={{backgroundColor:'gray',boxShadow:'0px 0px 10px 4px rgba(0, 0, 0, 0.40'}}>
            <Link 
                className="navbar-brand" 
                to="/inicio"
                
            >
                <img src='https://firebasestorage.googleapis.com/v0/b/roastlab-579e1.appspot.com/o/1686095751028.png?alt=media&token=a95a9e83-b18b-4ed1-aca4-61ef0a8d63a7'
                width={80} height={65}></img>
            </Link>
            

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className={({isActive}) =>`nav-item nav-link ${ isActive ? 'active' : '' }`} 
                        to="/inicio"
                        style={{paddingTop: '15px', paddingBottom:'15px', fontSize:'20px'}}
                    >
                        Inicio
                    </NavLink>
                    <NavLink 
                        className={({isActive}) =>`nav-item nav-link ${ isActive ? 'active' : '' }`}
                        to="/search"
                        style={{paddingTop: '15px', paddingBottom:'15px', fontSize:'20px'}}
                    >
                        Buscar
                    </NavLink>
                    <NavLink 
                        className={({isActive}) =>`nav-item nav-link ${ isActive ? 'active' : '' }`}
                        to="/agregar"
                        style={{paddingTop: '15px', paddingBottom:'15px', fontSize:'20px'}}
                    >
                        Agregar
                    </NavLink>
                    <NavLink 
                        className={({isActive}) =>`nav-item nav-link ${ isActive ? 'active' : '' }`} 
                        to="/qualify"
                        style={{paddingTop: '15px', paddingBottom:'15px', fontSize:'20px'}}
                    >
                        Calificar
                    </NavLink>
                    <NavLink 
                        className={({isActive}) =>`nav-item nav-link ${ isActive ? 'active' : '' }`}
                        to="/export"
                        style={{paddingTop: '15px', paddingBottom:'15px', fontSize:'20px'}}
                    >
                        Exportar
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <button
                        className='nav-item nav-link btn'
                        onClick={ onLogout }
                        style={{paddingTop: '15px', paddingBottom:'15px', fontSize:'20px'}}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}
