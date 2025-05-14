import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { RoastLabRoutes } from "../roastlab/routes/RoastLabRoutes";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { FormMenu } from "../roastlab/pages/FormMenu";
import { Register } from "../auth/pages/Register";
import { FormSensorial } from "../roastlab/pages/FormSensorial";
import { Navbar } from "../roastlab/components";
import { ProtectedRoute } from "../roastlab/components/ProtectedRoute";
import {
  ExportPage,
  FormProduccion,
  Formulario,
  Mainpage,
  SearchPages,
} from "../roastlab/pages";
import { FormCultivo } from "../roastlab/pages/FormCultivo";
import { FormTrilla } from "../roastlab/pages/FormTrilla";
import { FormRecibido } from "../roastlab/pages/FormRecibido";
import { FormTueste } from "../roastlab/pages/FormTueste";
import { FormFermentacion } from "../roastlab/pages/FormFermentacion";
import { FormSecado } from "../roastlab/pages/FormSecado";

export const AppRouter = () => {
  //const [isAuthenticated, setIsAuthenticated] = useState( false);
  const { isAuthenticated , login, logout, getCookie, User } =
    useContext(AuthContext);
  const storedUser = localStorage.getItem('user')
  const token = getCookie("token");
  useEffect(() => {
   
    
    if (token) {
     
            if(Object.keys(User).length === 0){
        login(JSON.parse(storedUser));
      }
      
      
      

    } else {
      logout();
      localStorage.removeItem('user');
    }

  }, [login, logout]);
  useEffect(()=>{
    if(User &&  typeof User === 'object'){
      if(Object.keys(User).length > 0){
         localStorage.setItem('user', JSON.stringify(User))
      }
    }
    
  },[token])

  return (
    <>
      {isAuthenticated ? <Navbar /> : undefined}

      <Routes>
      {User !== null? <>
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={token } 
              Rol={User.rol}
            />
          }
        >
          <Route path="add" element={<Formulario />} />
          <Route path="Produccion" element={<FormProduccion />} />
          <Route path="cultivo" element={<FormCultivo />} />
          <Route path="Agregar" element={<FormMenu />} />
          <Route path="inicio" element={<Mainpage />} />
          <Route path="search" element={<SearchPages />} />
          <Route path="export" element={<ExportPage />} />
          <Route path="trilla" element={<FormTrilla />} />
          <Route path="recibido" element={<FormRecibido />} />
          <Route path="tueste" element={<FormTueste />} />
          <Route path="fermentacion" element={<FormFermentacion />} />
          <Route path="secado" element={<FormSecado />} />
        </Route>
        <Route
          path="qualify"
          element={
            <ProtectedRoute
              isAuthenticated={
                token 
              }
              redirectTo="/qualify"
              Rol={User.rol}
            >
              <FormSensorial />
            </ProtectedRoute>
          }
        /></>:undefined}
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<Register />} />
        <Route path="/*" element={<Navigate to='/login' />} />
      </Routes>
    </>
  );
};
