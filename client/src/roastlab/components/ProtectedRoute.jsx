import { Navigate,Outlet } from 'react-router-dom'

export const ProtectedRoute = ({isAuthenticated,Rol,children, redirectTo= "/qualify"}) => {
    if(!isAuthenticated){
       return <Navigate to='/login' />
       
    }else{
        if(Rol === 'catador'){
            return  <> {children}<Navigate to={redirectTo} />  </>
        }
        if(Rol === 'admin'){
            return <>{children? children : <Outlet/>} </>
        }
     //return  children? children : <Outlet/>
    }
  
    
}
