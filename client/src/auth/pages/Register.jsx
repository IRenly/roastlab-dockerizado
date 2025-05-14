import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { BiSolidError } from "react-icons/bi";
import { GetMunicipios } from "../../roastlab/helpers/get";
import Addusuario from "../../roastlab/helpers/post/Addusuario";
import { AddUser } from "../../roastlab/helpers/post/Add_User";

export const Register = () => {
  const navigate = useNavigate();
  const [Cedula, setCedula] = useState("");
  const [nombre, setnombre] = useState("");
  const [tel, settel] = useState("");
  const [genero, setgenero] = useState("");
  const [Idmunicipio, setIdmunicipio] = useState("");
  const [NameMunicipio, setNameMunicipio] = useState("");
  const [Municipio, setMunicipio] = useState("");
  const [idMunicipio, setidMunicipio] = useState("");
  const [listMunicipio, setlistMunicipio] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, seterr] = useState(false);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    GetMunicipios(setlistMunicipio);
  }, [1]);
  useEffect(() => {
    if (password !== password2) {
      seterr(true);
    } else {
      seterr(false);
    }
  }, [password2]);
  const onlogin = () => {
    navigate("/Login");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const success=await AddUser(
        Cedula,
        nombre,
        tel,
        username,
        genero,
        idMunicipio,
        username,
        password
      );
   if(success){
    onlogin();
   }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container"
      style={{
        marginTop: "10%",
        marginBottom: "10%",
        backgroundColor: "#3C2A21",
        maxWidth: "100%",
        paddingTop: "2vh",
        paddingBottom: "2vh",
        boxShadow: "0px 0px 30px 15px rgba(0,0,0,0.55)",
      }}
    >
      <div
        className="container"
        style={{
          backgroundColor: "#861521",
          width: "80vh",
          height: "120vh",
          borderRadius: "20px",
          borderColor: "white",
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2
              className="text-center mb-4"
              style={{ marginTop: "25%", color: "white", fontSize: "6vh" }}
            >
              Registrate{" "}
            </h2>
            <form onSubmit={handleLogin}>
              <div
                className="mb-3"
                style={{ color: "white", fontSize: "2.5vh" }}
              >
                <label htmlFor="Cedula" className="form-label">
                  Cedula
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Cedula"
                  value={Cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
              <div
                className="mb-3"
                style={{ color: "white", fontSize: "2.5vh" }}
              >
                <label htmlFor="Nombre" className="form-label">
                  Nombre y Apellidos
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Nombre"
                  value={nombre}
                  autoComplete="off"
                  onChange={(e) => setnombre(e.target.value)}
                  required
                />
              </div>
              <div
                className="mb-3"
                style={{ color: "white", fontSize: "2.5vh" }}
              >
                <label htmlFor="Telefono" className="form-label">
                  Telefono
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Telefono"
                  value={tel}
                  autoComplete="off"
                  onChange={(e) => settel(e.target.value)}
                  required
                />
              </div>
              <div
                className="mb-3 "
                style={{ color: "white", fontSize: "2.5vh" }}
              >
                {genero === "" ? (
                  <>
                    <label htmlFor="Telefono" className="form-label">
                      Genero
                    </label>
                    <button
                      className="btn btn-outline-secondary dropdown-toggle col-12 bg-white"
                      type="button"
                      id="genero"
                      name="genero"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {"Seleccione"}
                    </button>
                  </>
                ) : (
                  <>
                    <label htmlFor="Telefono" className="form-label">
                      Genero
                    </label>
                    <button
                      className="btn btn-outline-secondary dropdown-toggle col-12 bg-white"
                      type="button"
                      id="genero"
                      name="genero"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {genero}
                    </button>
                  </>
                )}

                <ul className="dropdown-menu">
                  <li
                    className="dropdown-item"
                    onClick={() => {
                      setgenero("Masculino");
                    }}
                  >
                    Masculino
                  </li>
                  <li
                    className="dropdown-item"
                    onClick={() => {
                      setgenero("Femenino");
                    }}
                  >
                    Femenino
                  </li>
                </ul>
              </div>
              <div
                className="mb-3 "
                style={{ color: "white", fontSize: "2.5vh" }}
              >
                {Municipio === "" ? (
                  <>
                    <label htmlFor="Telefono" className="form-label">
                      Municipio
                    </label>

                    <button
                      className="btn btn-outline-secondary dropdown-toggle col-12 bg-white"
                      type="button"
                      id="municipio"
                      name="municipio"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      defaultValue={Municipio || ""}
                    >
                      {"Seleccione"}
                    </button>
                  </>
                ) : (
                  <>
                    <label htmlFor="Telefono" className="form-label">
                      Municipio
                    </label>
                    <button
                      className="btn btn-outline-secondary dropdown-toggle col-12 bg-white"
                      type="button"
                      id="municipio"
                      name="municipio"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      defaultValue={Municipio || ""}
                    >
                      {Municipio}
                    </button>
                  </>
                )}

                <ul className="dropdown-menu ">
                  {listMunicipio.map((val) => {
                    return (
                      <li
                        key={val.id}
                        className="dropdown-item"
                        onClick={() => {
                          setMunicipio(val.nombre_mun);
                          setidMunicipio(val.id);
                        }}
                      >
                        {val.nombre_mun}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div
                className="mb-3"
                style={{ color: "white", fontSize: "2.5vh" }}
              >
                <label htmlFor="username" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  value={username}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label"
                  style={{ color: "white", fontSize: "2.5vh" }}
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password2"
                  className="form-label"
                  style={{ color: "white", fontSize: "2.5vh" }}
                >
                  Confirme Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  value={password2}
                  autoComplete="off"
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
              </div>
              {err ? (
                <span className=" text-white">
                  {" "}
                  <BiSolidError /> Contraseña no coinciden
                </span>
              ) : undefined}
              <div className="d-grid gap-2 mb-2">
                <button
                  type="submit"
                  className="btn btn-primary mt-4"
                  style={{ boxShadow: "0px 0px 13px 0px rgba(0,0,0,0.56)" }}
                >
                  Registrar
                </button>
                <Link className="text-blue" to='/login' > regresar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
