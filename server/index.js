const express = require("express");
const formulario = express();
const ExcelJS = require("exceljs");
const mysql = require("mysql");
const cors = require("cors");

formulario.use(cors());
formulario.use(express.json());
//pmas0p0rt3
const db = mysql.createConnection({
  host: "mysql", // 👈 nombre del contenedor
  user: "root",
  password: "root",
  database: "roastlab_db",
});
// const db = mysql.createConnection({
//   host: "45.33.119.221",
//   user: "roastlhk_milo",
//   password: "camilo2051",
//   database: "roastlhk_roastlab",
// });
///--------------------------------------------------------guardar datos----------------------------------------
// guardar persona

formulario.get("/", (req, res) => {
    res.send("Servidor corriendo!");
});
formulario.post("/create", (req, res) => {
  const Cedula = req.body.Cedula;
  const Nombre = req.body.Nombre;
  const Tel = req.body.Tel;
  const Email = req.body.Email;
  const Genero = req.body.Genero;
  const Municipio = req.body.Municipio;
  if (!Cedula || !Nombre || !Tel || !Email || !Genero || !Municipio) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  db.query(
    "INSERT INTO persona(cedula, nombre, tel, email, genero, municipio) VALUES (?,?,?,?,?,?)",
    [Cedula, Nombre, Tel, Email, Genero, Municipio],
    (err, resul) => {
      if (err) {
       // res.status(401).json({ message: "Credenciales inválidas" });
       
       return res.status(500).json({ error: "Error al guardar los datos", message: err.sqlMessage });
      } else {
        return res.json({ message: "Registro exitoso" });
      }
    }
  );
});
//guardar producion
formulario.post("/producion", (req, res) => {
  const num_areascul = req.body.Area_Cul;
  const tipo_produccion = req.body.Tipo_pro;
  const vereda = req.body.Vereda;
  const ubiciacion = req.body.Coordenadas;
  const cedula = req.body.Ccper;
  if (!num_areascul || !tipo_produccion || !vereda || !ubiciacion || !cedula ) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  db.query(
    "INSERT INTO area_pro(num_areascul, tipo_produccion, vereda, latitud, longitud, cedula) VALUES (?,?,?,?,?)",
    [num_areascul, tipo_produccion, vereda, ubiciacion, cedula],
    (err, result) => {
      if (err) {
        if(err.code === "ER_NO_REFERENCED_ROW_2"){
          return res.status(500).json({  error: "Cedula no encontrada",
        message: "No se puede guardar la producion si no hay una cedula validad de una persona"});
        }
        return res.status(500).json({ error: "Error al guardar los datos"});
      } else {
        return res.json({ message: "Registro exitoso" });
      }
    }
  );
});
//guardar datos cultivo
formulario.post("/Cultivo", (req, res) => {
  const id = req.body.Id;
  const Variedad = req.body.Variedad;
  const Edad_cul = req.body.Edad_cul;
  const Producion = req.body.Producion;
  const Altura_SNM = req.body.Altura_SNM;
  const Fertilizacion = req.body.Fertilizacion;
  const Organico = req.body.Organico;
  const IdTipo = req.body.IdTipo;
  const estado_muestra = req.body.estado_muestra;
  const  Hectareas = req.body. Hectareas
  

  db.query(
    "INSERT INTO cultivo (id, variedad, edad_cultivo, altura_snm, fertilizacion, organico, tipo_beneficio, estado_muestra, hectareas, area_pro) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      id,
      Variedad,
      Edad_cul,
      Altura_SNM,
      Fertilizacion,
      Organico,
      IdTipo,
      estado_muestra,
      Hectareas,
      Producion,
    ],
    (err, result) => {
      if (err) {
        if(err.code === 'ER_DUP_ENTRY'){
          return res.status(500).send("El codigo id ya existe");
        }
        if(err.code === 'ER_NO_REFERENCED_ROW_2'){
          res.status(500).json({  error: "Produccion no encontrada",
          message: "No se puede guardar el cultivo si no se ingresa un id de produccion ya registrado"});
        }
        if(err.code === 'ER_BAD_NULL_ERROR'){
          res.status(500).json({  error: "Dato nulo",
          message: "Falta algun campo obligatorio"});
        }
        return res.status(500).send("Error en la base de datos");
      } else {
        return res.json({ message: "Registro exitoso" });
      }
    }
  );
});
//Guardar datos de fermentacion
formulario.post("/Fermentacion", (req, res) => {
  const Temperatura = req.body.Temperatura;
  const Fermentacion = JSON.stringify(req.body.Fermentacion);
  const pH = req.body.pH;
  const GradosBrix = req.body.GradosBrix;
  const MicroOrganismos = req.body.MicroOrganismos;
  const culturin = req.body.culturin;
  const InfoMicroOrganismos = req.body.InfoMicroOrganismos;
  const Infoculturin = req.body.Infoculturin;
  const cultivo = req.body.cultivo;
  console.log("este es el cultivo" + cultivo);
  db.query(
    "INSERT INTO fermentado (temperatura, fermentacion, pH, grados_brix, microorganismos, culturing, info_microorganismo, info_culturing, cultivo ) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      Temperatura,
      Fermentacion,
      pH,
      GradosBrix,
      MicroOrganismos,
      culturin,
      InfoMicroOrganismos,
      Infoculturin,
      cultivo,
    ],
    (err, result) => {
      if (err) {
        if(err.code === 'ER_DUP_ENTRY'){
          return res.status(500).send("El codigo id ya existe");
        }
        if(err.code === 'ER_NO_REFERENCED_ROW_2'){
          res.status(500).json({  error: "codigo no encontrado",
          message: "No se puede guardar el fermentado si no se ingresa un codigo de cultivo valido"});
        }
        // if(err.code === 'ER_BAD_NULL_ERROR'){
        //   res.status(500).json({  error: "Dato nulo",
        //   message: "Falta algun campo obligatorio"});
        // }
        return res.status(500).send("Error en la base de datos");
      } else {
        return res.json({ message: "Registro exitoso" });
      }
    }
  );
});
//guardar datos de secado
formulario.post("/Secado", (req, res) => {
  const Tempo_secado = req.body.Temp_secado;
  const Humedad = req.body.Humeda_relativa;
  const Temperatura = req.body.Temp_hambiente;
  const Tipo_secado = JSON.stringify(req.body.Tipo_secado);
  const Idsilo = req.body.Idsilo;
  const Id_combus = req.body.Id_combus;
  const Secado_continuo = req.body.Secado_continuo;
  const cultivo = req.body.cultivo;

  db.query(
    "INSERT INTO secado (temp_secado, humedad_relativa, temp_ambiente, tipo_secado, tipo_combustible, tipo_silo, secado_continuo, cultivo) VALUES (?,?,?,?,?,?,?,?)",
    [
      Tempo_secado,
      Humedad,
      Temperatura,
      Tipo_secado,
      Id_combus,
      Idsilo,
      Secado_continuo,
      cultivo,
    ],
    (err, result) => {
      if (err) {
        if(err.code === 'ER_DUP_ENTRY'){
          return res.status(500).send("El codigo id ya existe");
        }
        if(err.code === 'ER_NO_REFERENCED_ROW_2'){
          res.status(500).json({  error: "codigo no encontrado",
          message: "No se puede guardar el Secado si no se ingresa un codigo de cultivo valido"});
        }
        if(err.code === 'ER_BAD_NULL_ERROR'){
          res.status(500).json({  error: "Dato nulo",
          message: "Falta algun campo obligatorio"});
        }
        return res.status(500).send("Error en la base de datos");
      } else {
        return res.json({ message: "Registro exitoso" });
      }
    }
  );
});
//guardar Beneficio
formulario.post("/Addbeneficio", (req, res) => {
  const Idcultivo = req.body.Idcultivo;
  const IdTipo = req.body.IdTipo;
  const IdFermentado = req.body.IdFermentado;
  const IdSecado = req.body.IdSecado;

  db.query(
    "INSERT INTO beneficio(cultivo, tipo_beneficio, fermentado, secado) VALUES (?,?,?,?)",
    [Idcultivo, IdTipo, IdFermentado, IdSecado],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//guardar trilla
formulario.post("/Trilla", (req, res) => {
  const IdMuestra = req.body.IdMuestra;
  const Huemdad = req.body.Huemdad;
  const A_W = req.body.A_W;
  const Factor = JSON.stringify(req.body.Factor);
  const Densidad = req.body.Densidad;
  const Color = JSON.stringify(req.body.Color);
  const Grados_B = req.body.Grados_B;
  const P_H = req.body.P_H;
  const Acidez = req.body.Acidez;
  const Info = req.body.Info;
  db.query(
    "INSERT INTO trilla( humedad, A_W, factor,  densidad,  color, grados_b, p_h, acidez, info_adicional, cultivo) VALUES(?,?,?,?,?,?,?,?,?,?)",
    [
      Huemdad,
      A_W,
      Factor,
      Densidad,
      Color,
      Grados_B,
      P_H,
      Acidez,
      Info,
      IdMuestra,
    ],
    (err, result) => {
      if (err) {
        if(err.code === 'ER_DUP_ENTRY'){
          return res.status(500).send("El codigo id ya existe");
        }
        if(err.code === 'ER_NO_REFERENCED_ROW_2'){
          res.status(500).json({  error: "codigo no encontrado",
          message: "No se puede guardar el Trilla si no se ingresa un codigo de cultivo valido"});
        }
        if(err.code === 'ER_BAD_NULL_ERROR'){
          res.status(500).json({  error: "Dato nulo",
          message: "Falta algun campo obligatorio"});
        }
        return res.status(500).send("Error en la base de datos");
      } else {
        return res.json({ message: "Registro exitoso" });
      }
    }
  );
});
// formulario.post("/Trilla", (req, res) => {
//   const Huemdad = req.body.Huemdad;
//   const Factor = req.body.Factor;
//   const A_W = req.body.A_W;
//   const Color = req.body.Color;
//   const Densidad = req.body.Densidad;
//   const Info = req.body.Info;
//   const idcultivo = req.body.idcultivo;
//   db.query(
//     "INSERT INTO trilla( humedad, factor, AW, color_cielab, densidad, info_adicional, cultivo) VALUES(?,?,?,?,?,?,?)",
//     [Huemdad, Factor, A_W, Color, Densidad, Info, idcultivo],
//     (err, resul) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(resul);
//       }
//     }
//   );
// });
//guardar tueste
formulario.post("/Tuesteseco", (req, res) => {
  const Huemdad = req.body.Huemdad;
  const A_W = req.body.A_W;
  const Color = JSON.stringify(req.body.Color);
  const Agtrom = req.body.Agtrom;
  const Densidad = req.body.Densidad;
  const Curva_granu = JSON.stringify(req.body.Curva_granu);
  const tipo_tueste = req.body.idTueste;
  const Info = req.body.Info;
  const grados_b = req.body.Grados_B;
  const p_h = req.body.P_H;
  const acidez = req.body.Acidez;
  const idrecibido = req.body.IdMuestra;
  console.log(A_W);
  db.query(
  "INSERT INTO tueste(humedad, AW, agtrom, color_cielab, densidad, curva_granulometrica, tipo_tueste, info_adicional, grados_b, p_h, acidez, cultivo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
  [
    Huemdad,
    A_W,
    Agtrom,
    Color,
    Densidad,
    Curva_granu,
    tipo_tueste,
    Info,
    grados_b,   // posición 9
    p_h,        // posición 10
    acidez,     // posición 11
    idrecibido, // posición 12
  ],
  (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(500).send("El código id ya existe");
      }
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(500).json({
          error: "Código no encontrado",
          message: "No se puede guardar el Tueste si no se ingresa un código de cultivo válido",
        });
      }
      if (err.code === 'ER_BAD_NULL_ERROR') {
        return res.status(500).json({
          error: "Dato nulo",
          message: "Falta algún campo obligatorio",
        });
      }
      return res.status(500).send("Error en la base de datos");
    } else {
      return res.json({ message: "Registro exitoso" });
    }
  }
);
}
);
//guardar puntaje
formulario.post("/sensorial", (req, res) => {
  const Fragancia = req.body.Fragancia;
  const Acidez = req.body.Acidez;
  const Dulzor = req.body.Dulzor;
  const Sabor = req.body.Sabor;
  const Cuerpo = req.body.Cuerpo;
  const Uniformidad = req.body.Uniformidad;
  const Sabor_residual = req.body.Sabor_residual;
  const Balance = req.body.Balance;
  const Tazalimpia = req.body.Tazalimpia;
  const catador = req.body.Catador;
  const Total = req.body.Total;
  const idCultivo = req.body.idCultivo;
  db.query(
    "INSERT INTO sensorial(fragancia, acidez, dulzor, sabor, cuerpo, uniformidad, sabor_residual, balance, taza_limpia,catador, total, cultivo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      Fragancia,
      Acidez,
      Dulzor,
      Sabor,
      Cuerpo,
      Uniformidad,
      Sabor_residual,
      Balance,
      Tazalimpia,
      catador,
      Total,
      idCultivo,
    ],
    (err, result) => {
      if (err) {
        if(err.code === 'ER_DUP_ENTRY'){
          return res.status(500).send("El codigo id ya existe");
        }
        if(err.code === 'ER_NO_REFERENCED_ROW_2'){
          res.status(500).json({  error: "codigo no encontrado",
          message: "No se puede guardar datos sensoriales si no se ingresa un codigo de cultivo valido"});
        }
        if(err.code === 'ER_BAD_NULL_ERROR'){
          res.status(500).json({  error: "Dato nulo",
          message: "Falta algun campo obligatorio"});
        }
        return res.status(500).send("Error en la base de datos");
      } else {
        return res.json({ message: "Registro exitoso" });
      }
    }
  );
});
//agregar muestra recibida
formulario.post("/recibido", (req, res) => {
  const FechaRecep = req.body.FechaRecep;
  const Huemdad = req.body.Huemdad;
  const A_W = req.body.A_W;
  const Factor = JSON.stringify(req.body.Factor);
  const Densidad = req.body.Densidad;
  const Color = JSON.stringify(req.body.Color);
  const Grados_B = req.body.Grados_B;
  const P_H = req.body.P_H;
  const Acidez = req.body.Acidez;
  const Info = req.body.Info;
  const cultivo = req.body.cultivo;
  db.query(
    "INSERT INTO recibido(fecha_recibido, humedad, A_W, factor, densidad, color, grados_b, p_h, acidez, info_adicional, cultivo) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    [
      FechaRecep,
      Huemdad,
      A_W,
      Factor,       // <--- ahora sí lo usas
      Densidad,
      Color,
      Grados_B,
      P_H,
      Acidez,
      Info,
      cultivo,
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        if(err.code === 'ER_DUP_ENTRY'){
          return res.status(500).send("El codigo id ya existe");
        }
        if(err.code === 'ER_NO_REFERENCED_ROW_2'){
          res.status(500).json({  error: "codigo no encontrado",
          message: "No se puede guardar la caracterizacion si no se ingresa un codigo de cultivo valido"});
        }
        if(err.code === 'ER_BAD_NULL_ERROR'){
          res.status(500).json({  error: "Dato nulo",
          message: "Falta algun campo obligatorio"});
        }
        return res.status(500).send("Error en la base de datos");
      } else {
        return res.json({ message: "Registro exitoso" });
      }
    }
  );
});
//registar catadores
formulario.post("/catador", (req, res) => {
  const Email = req.body.username;
  const contraseña = req.body.contraseña;
  const cedula = req.body.Cedula;
  const rol = "catador";
  console.log(Email)
  db.query(
    "INSERT INTO usuario(usuario, contraseña, rol, cedula) VALUES(?,?,?,?)",
    [Email, contraseña, rol, cedula],(err,result)=>{
      if(err){
        //res.status()
        console.log(err)
      }else{
        res.send(result)
      }
    }
  );
});
//comprobar la cedula
formulario.post("/Cedula", (req, res) => {
  const Cedula = req.body.Cedula;

  db.query(
    `SELECT cedula FROM persona WHERE cedula=${Cedula} `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          //res.json({ message: 'Inicio de sesión exitoso' });
          res.send(true);
        } else {
          //res.status(401).json({ message: 'Credenciales inválidas' });
          res.send(false);
        }
      }
    }
  );
});
//Comprobar la Muestra
formulario.post("/Muestra", (req, res) => {
  const Muestra = req.body.Muestra;
  db.query(
    `SELECT id FROM cultivo WHERE id like "${Muestra}" `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          //res.json({ message: 'Inicio de sesión exitoso' });
          res.send(true);
        } else {
          //res.status(401).json({ message: 'Credenciales inválidas' });
          res.send(false);
        }
      }
    }
  );
});
//-----------------------------------------------traer datos-----------------------------------------------
//traer id ultimo resgistro de produccion
formulario.post("/area_pro", (req, res) => {
  const Cedula = req.body.C;

  db.query(
    "SELECT * FROM area_pro WHERE cedula = ?",
    [Cedula],
    (err, resul) => {
      if (err) {
        console.log(err);
      } else {
        res.send(resul);
      }
    }
  );
});
//traer el listado de la variedad
formulario.get("/variedad", (req, res) => {
  db.query("SELECT * FROM variedad", (err, resul) => {
    if (err) {
      console.log(err);
    } else {
      res.send(resul);
    }
  });
});
// traer lista de tipo de beneficio
formulario.get("/Tipobeneficio", (req, res) => {
  db.query("SELECT * FROM tipo_beneficio", (err, resul) => {
    if (err) {
      console.log(err);
    } else {
      res.send(resul);
    }
  });
});
// traer lista de combustible
formulario.get("/combustible", (req, res) => {
  db.query("SELECT * FROM tipo_combustible", (err, resul) => {
    if (err) {
      console.log(err);
    } else {
      res.send(resul);
    }
  });
});
// traer lista de silo
formulario.get("/silo", (req, res) => {
  db.query("SELECT * FROM tipo_silo", (err, resul) => {
    if (err) {
      console.log(err);
    } else {
      res.send(resul);
    }
  });
});
//traer ultimo id de cultivo
formulario.get("/idcultivo", (req, res) => {
  db.query("SELECT id FROM cultivo ORDER BY id DESC LIMIT 1", (err, resul) => {
    if (err) {
      console.log(err);
    } else {
      res.send(resul);
    }
  });
});
//traer tipo tueste
  // traer lista de tipo de tueste
  formulario.get("/tipoTueste", (req, res) => {
    db.query("SELECT * FROM tipo_tueste", (err, resul) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al obtener los tipos de tueste");
      } else {
        res.send(resul);
      }
    });
  });
//traer id de ultima fermentacion
formulario.get("/idFermentacion", (req, res) => {
  db.query(
    "SELECT id FROM fermentado ORDER BY id DESC LIMIT 1",
    (err, resul) => {
      if (err) {
        console.log(err);
      } else {
        res.send(resul);
      }
    }
  );
});
//traer ultimo Beneficio
formulario.get("/IdBeneficio", (req, res) => {
  db.query(
    "SELECT id FROM beneficio ORDER BY id DESC LIMIT 1",
    (err, resul) => {
      if (err) {
        console.log(err);
      } else {
        res.send(resul);
      }
    }
  );
});
//traer lista municipio
formulario.get("/municipio", (req, res) => {
  db.query("SELECT * FROM municipios", (err, resul) => {
    if (err) {
      console.log(err);
    } else {
      res.send(resul);
    }
  });
});
//traer id  de secado
formulario.get("/idsecado", (req, res) => {
  db.query("SELECT id FROM secado ORDER BY id DESC LIMIT 1", (err, resul) => {
    if (err) {
      console.log(err);
    } else {
      res.send(resul);
    }
  });
});
//traer ultimo id recibido
formulario.get("/idrecibido", (req, res) => {
  db.query("SELECT id FROM recibido ORDER BY id DESC LIMIT 1", (err, resul) => {
    if (err) {
      console.log(err);
    } else {
      res.send(resul);
    }
  });
});
//traer ultimo estado muestra
formulario.post("/cultivoMuestra", (req, res) => {
  const id = req.body.Id;
  db.query(
    "SELECT estado_muestra FROM cultivo WHERE id = ?",
    [id],
    (err, resul) => {
      if (err) {
        console.log(err);
      } else {
        res.send(resul);
      }
    }
  );
});
//traer ultimo id trilla
formulario.get("/idtrilla", (req, res) => {
  db.query("SELECT id FROM trilla ORDER BY id DESC LIMIT 1", (err, resul) => {
    if (err) {
      console.log(err);
    } else {
      res.send(resul);
    }
  });
});
//traer ultimo id Tueste
formulario.get("/idtueste", (req, res) => {
  db.query("SELECT id FROM tueste ORDER BY id DESC LIMIT 1", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Traer ID Municipio
formulario.post("/codemun", (req, res) => {
  const id = req.body.idmun;
  db.query(
    "SELECT codigo_mun FROM municipios where id=?",
    [id],
    (err, resul) => {
      if (err) {
        console.log(err);
      } else {
        res.send(resul);
      }
    }
  );
});
//traer ultiomo id recibido
//codigo Estructurado
formulario.post("/codigo", (req, res) => {
  const cedula = req.body.cedula;
  console.log(cedula);
  db.query(
    "SELECT mun.codigo_mun FROM persona p join municipios mun on p.municipio=mun.id WHERE p.cedula=?",
    [cedula],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//Contador
formulario.post("/contador", (req, res) => {
  const municipio = req.body.mun;
  const variedad = req.body.var;
  const beneficio = req.body.ben;

  console.log(
    "Consultando esta información (Index.js) " +
      municipio +
      "-" +
      variedad +
      "-" +
      beneficio
  );
  db.query(
    "Select COUNT(*) from cultivo cul JOIN area_pro are on cul.area_pro=are.id join persona p on are.cedula=p.cedula JOIN variedad var on cul.variedad=var.id JOIN tipo_beneficio tb on cul.tipo_beneficio=tb.id JOIN municipios mun on p.municipio=mun.id WHERE var.codigo_var like ? AND mun.codigo_mun LIKE ? AND tb.codigo LIKE ?",
    [variedad, municipio, beneficio],
    (err, resul) => {
      if (err) {
        console.log(err);
      } else {
        res.send(resul);
      }
    }
  );
});
//buscar por muestra
formulario.post("/BuscarMuestra", (req, res) => {
  const buscar = req.body.buscar;

  db.query(
    `SELECT p.cedula as cedula, p.nombre as nombre_persona, p.tel,p.email, p.genero, mun.id as ID_Mun,mun.nombre_mun, are.id as ID_Area, are.num_areascul, are.tipo_produccion, are.vereda, are.latitud, are.longitud, cul.id as ID_Cultivo, var.id as ID_Variedad, var.nombre_variedad, cul.edad_cultivo, cul.altura_snm, cul.fertilizacion, cul.organico, cul.hectareas, tb.id as ID_TipoBen, tb.nombre as Nombre_Beneficio, cul.estado_muestra, rec.id as ID_Recibido, rec.fecha_recibido, rec.humedad AS Humedad_Recibido, rec.A_W as AW_Recibido, rec.factor as Factor_Recibido, rec.densidad as Densidad_Recibido, rec.color as Color_Recibido, rec.grados_b as GradosB_Recibido, rec.p_h as PH_Recibido, rec.acidez as Acidez_Recibido, rec.info_adicional as Info_Recibido,fer.id as ID_Fermentado, fer.temperatura as Temp_Fermentado, fer.fermentacion, fer.pH as PH_Fermentado, fer.grados_brix as GradosB_Fermentado, fer.microorganismos, fer.culturing, fer.info_microorganismo, fer.info_culturing, sec.id as ID_Secado, sec.temp_secado as Temp_Secado, sec.humedad_relativa as Humedad_Secado, sec.temp_ambiente, sec.tipo_secado, tc.id as ID_TipoCombustible, tc.nombre as Nombre_TipoCombustible,
  ts.id as ID_TipoSilo, ts.nombre as Nombre_TipoSilo, sec.secado_continuo,tri.id as ID_Trilla, tri.humedad as Humedad_Trilla, tri.A_W as AW_Trilla, tri.factor as Factor_Trilla, tri.densidad as Densidad_Trilla, tri.color as Color_Trilla, tri.grados_b as GradosB_Trilla, tri.p_h as PH_Trilla, tri.acidez as Acidez_Trilla, tri.info_adicional as Info_Trilla, tues.id as ID_Tueste, tues.humedad as Humedad_Tueste, tues.AW as AW_Tueste, tues.color_cielab as Color_Tueste, tues.agtrom AS Agtrom_tueste, tues.densidad as Densidad_Tueste, tues.curva_granulometrica, tues.tipo_tueste, tues.info_adicional as Info_Tueste FROM cultivo cul JOIN area_pro are on cul.area_pro=are.id JOIN persona p on are.cedula=p.cedula LEFT JOIN fermentado fer on fer.cultivo=cul.id LEFT JOIN secado sec on sec.cultivo=cul.id JOIN variedad var on var.id=cul.variedad JOIN municipios mun on mun.id=p.municipio JOIN tipo_beneficio tb on tb.id=cul.tipo_beneficio LEFT JOIN tipo_silo ts on ts.id=sec.tipo_silo LEFT JOIN tipo_combustible tc on tc.id=sec.tipo_combustible LEFT JOIN recibido rec on rec.cultivo=cul.id left JOIN trilla tri on tri.cultivo=cul.id left JOIN tueste tues on tues.cultivo=cul.id WHERE cul.id LIKE ?`,
    [buscar],
    (err, result) => {
      if (err) {
         res.json({message: "error en el servidor"})
      } else {
        if(result.length === 0){
            res.status(404).json({message: "No se encontro registro de este codigo"})
            return
        }
        res.send(result);
      }
    }
  );
});

//Traer Ultimas 3 Muestras para las Cards
formulario.get("/muestras", (req, res) => {
  db.query(
    "SELECT cul.id as ID_Muestra, var.nombre_variedad, p.nombre as Nombre_Persona, p.cedula, p.email, p.genero, cul.edad_cultivo, tb.nombre, are.vereda, mun.nombre_mun from cultivo cul join area_pro are on cul.area_pro=are.id join persona p on are.cedula=p.cedula JOIN municipios mun on p.municipio=mun.id JOIN variedad var on cul.variedad=var.id join tipo_beneficio tb on tb.id=cul.tipo_beneficio ORDER BY are.id DESC LIMIT 3",
    (err, resul) => {
      if (err) {
        console.log(err);
      } else {
        res.send(resul);
      }
    }
  );
});
// promedios sensorial
formulario.post("/promediosMuestra",(req,res)=>{
  const Muestra = req.body.Muestra
  db.query(`SELECT AVG(fragancia) AS promedioFragancia, 
  AVG(acidez) AS PromedioAcidez,
  AVG(dulzor) AS PromedioDulzo,
  AVG(sabor) AS PromedioSabor,
  AVG(cuerpo) AS PromedioCuerpo,
  AVG(uniformidad) AS PromedioUniformidad,
  AVG(sabor_residual) AS PromedioSaborResidual,
  AVG(balance) AS PromedioBalance,
  AVG(taza_limpia) AS PromedioTazalimpia,
  AVG(catador) AS PromedioCatador,
  AVG(total) AS PromedioTotal
  FROM sensorial WHERE cultivo LIKE ?`, [`%${Muestra}%`],
  (err, result) => {
    if (err) {
      console.error("Error SQL:", err); // 👈 para que veas en consola
      res.status(500).json({ error: err.code });
    } else {
      res.send(result);
    }
  }
);

})
//------------------------------------------------------- update -----------------------------------------------

formulario.put("/updatepersona", (req, res) => {
  const Nombre = req.body.Nombre;
  const Cedula = req.body.Cedula;
  const Telefono = req.body.Telefono;
  const Email = req.body.Email;
  const Genero = req.body.Genero;
  const Municipio = req.body.Municipio;

  db.query(
    "UPDATE persona SET cedula=?, nombre=?, tel=?, email=?, genero=?, municipio=? WHERE cedula=?",
    [Cedula, Nombre, Telefono, Email, Genero, Municipio, Cedula],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar los datos" });
      } else {
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "No se encontró la persona con esa cédula" });
        } else {
          return res.json({ message: "Datos actualizados correctamente" });
        }
      }
    }
  );
});
//Update produccion
formulario.put("/updateProduccion", (req, res) => {
  const Id = req.body.Id;
  const Num_areascul = req.body.Area_Cul;
  const Tipo_pro = req.body.Tipo_pro;
  const Vereda = req.body.Vereda;
  const Coordenadas = req.body.Coordenadas;

  db.query(
    "UPDATE area_pro SET num_areascul=?, tipo_produccion=?, vereda=?, latitud=?, longitud=? WHERE id=?",
    [Num_areascul, Tipo_pro, Vereda, Coordenadas[0], Coordenadas[1], Id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar los datos" });
      } else {
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "No se encontró el área de producción con ese ID" });
        } else {
          return res.json({ message: "Datos actualizados correctamente" });
        }
      }
    }
  );
});
//update Cultivo
formulario.put("/updateCultivo", (req, res) => {
  const id = req.body.id;
  const Variedad = req.body.idVariedad;
  const Edad_cul = req.body.Edad_Cul;
  const Producion = req.body.idProducion;
  const Altura_SNM = req.body.Altura_SNM;
  const Fertilizacion = req.body.Fertilizacion;
  const Organico = req.body.Organico;
  const IdTipo = req.body.IdTipo;
  const muestra = req.body.estado_muestra;
  const  Hectareas = req.body.Hectareas
  db.query(
    "UPDATE cultivo SET variedad=?,edad_cultivo=?,altura_snm=?,fertilizacion=?,organico=?, area_pro=?, tipo_beneficio=?, estado_muestra=?, hectareas=? WHERE id=?",
    [
      Variedad,
      Edad_cul,
      Altura_SNM,
      Fertilizacion,
      Organico,
      Producion,
      IdTipo,
      muestra,
      Hectareas,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar los datos" });
      } else {
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "No se encontró cultivo con ese ID" });
        } else {
          return res.json({ message: "Datos actualizados correctamente" });
        }
      }
    }
  );
});
//update fermentacion
formulario.put("/updateFermentacion", (req, res) => {
  const Id = req.body.Id;
  const Temperatura = req.body.Temperatura;
  const Fermentacion = JSON.stringify(req.body.Fermentacion);
  const pH = req.body.pH;
  const GradosBrix = req.body.GradosBrix;
  const MicroOrganismos = req.body.MicroOrganismos;
  const culturin = req.body.culturin;
  const InfoMicroOrganismos = req.body.InfoMicroOrganismos;
  const Infoculturin = req.body.Infoculturin;
  const cultivo = req.body.cultivo;

  db.query(
    "UPDATE fermentado SET temperatura=?,fermentacion=?,pH=?,grados_brix=?,microorganismos=?,culturing=?, info_microorganismo=?, info_culturing=? WHERE id = ?",
    [
      Temperatura,
      Fermentacion,
      pH,
      GradosBrix,
      MicroOrganismos,
      culturin,
      InfoMicroOrganismos,
      Infoculturin,
      Id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar los datos" });
      } else {
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "No se encontró Fermentado con ese ID" });
        } else {
          return res.json({ message: "Datos actualizados correctamente" });
        }
      }
    }
  );
});
// update secado
formulario.put("/Updatesecado", (req, res) => {
  const Id = req.body.Id;
  const Tempo_secado = req.body.Temp_secado;
  const Humedad = req.body.Humeda_relativa;
  const Temperatura = req.body.Temp_hambiente;
  const Tipo_secado = JSON.stringify(req.body.Tipo_secado);
  const Idsilo = req.body.Idsilo;
  const Id_combus = req.body.Id_combus;
  const Secado_continuo = req.body.Secado_continuo;
  db.query(
    "UPDATE secado SET temp_secado=?,humedad_relativa=?,temp_ambiente=?,tipo_secado=?,tipo_combustible=?,tipo_silo=?,secado_continuo=? WHERE id = ?",
    [
      Tempo_secado,
      Humedad,
      Temperatura,
      Tipo_secado,
      Id_combus,
      Idsilo,
      Secado_continuo,
      Id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar los datos" });
      } else {
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "No se encontró Secado con ese ID" });
        } else {
          return res.json({ message: "Datos actualizados correctamente" });
        }
      }
    }
  );
});
//update beneficio
formulario.put("/UpdateBeneficio", (req, res) => {
  const Idbeneficio = req.body.Idbeneficio;
  const Idcultivo = req.body.Idcultivo;
  const IdTipo = req.body.IdTipo;
  const IdFermentado = req.body.IdFermentado;
  const IdSecado = req.body.IdSecado;

  db.query(
    "UPDATE beneficio SET cultivo=?,tipo_beneficio=?,fermentado=?,secado=? WHERE id = ?",
    [Idcultivo, IdTipo, IdFermentado, IdSecado, Idbeneficio],
    (err, resul) => {
      if (err) {
        console.log(err);
      } else {
        res.send(resul);
      }
    }
  );
});
//update recibido
formulario.put("/Updaterecibido", (req, res) => {
  const idRecibido = req.body.idRecibido;
  const FechaRecep = req.body.FechaRecep;
  const Huemdad = req.body.Huemdad;
  const A_W = req.body.A_W;
  const Factor = JSON.stringify(req.body.Factor);
  const Densidad = req.body.Densidad;
  const Color = JSON.stringify(req.body.Color);
  const Grados_B = req.body.Grados_B;
  const P_H = req.body.P_H;
  const Acidez = req.body.Acidez;
  const Info = req.body.Info;
  db.query(
    "UPDATE recibido SET fecha_recibido=?,humedad=?, A_W=?, factor=?, densidad=?,color=?,grados_b=?,p_h=?,acidez=?,info_adicional=? WHERE id = ?",
    [
      FechaRecep,
      Huemdad,
      A_W,
      Factor,
      Densidad,
      Color,
      Grados_B,
      P_H,
      Acidez,
      Info,
      idRecibido,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar los datos" });
      } else {
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "No se encontró Caracterizacion con el  ID ingresado" });
        } else {
          return res.json({ message: "Datos actualizados correctamente" });
        }
      }
    }
  );
});
//update trilla
formulario.put("/Updatetrilla", (req, res) => {
  const idTrilla = req.body.idTrilla;
  const Huemdad = req.body.Huemdad;
  const A_W = req.body.A_W;
  const Factor = JSON.stringify(req.body.Factor);
  const Densidad = req.body.Densidad;
  const Color = JSON.stringify(req.body.Color);
  const Grados_B = req.body.Grados_B;
  const P_H = req.body.P_H;
  const Acidez = req.body.Acidez;
  const Info = req.body.Info;
  db.query(
    "UPDATE trilla SET humedad=?, a_w=?, factor=?, densidad=?, color=?, grados_b=?, p_h=?, acidez=?, info_adicional=?  WHERE id = ?",
    [
      Huemdad,
      A_W,
      Factor,
      Densidad,
      Color,
      Grados_B,
      P_H,
      Acidez,
      Info,
      idTrilla,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar los datos" });
      } else {
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "No se encontró Trilla con el ID ingresado" });
        } else {
          return res.json({ message: "Datos actualizados correctamente" });
        }
      }
    }
  );
});
//UpdateTueste
formulario.put("/UpdateTueste", (req, res) => {
  const id = req.body.Id;
  const Huemdad = req.body.Huemdad;
  const A_W = req.body.A_W;
  const Color = JSON.stringify(req.body.Color);
  const Agtrom = req.body.Agtrom;
  const Densidad = req.body.Densidad;
  const Curva_granu = JSON.stringify(req.body.Curva_granu);
  const tipo_tueste = req.body.idTueste;
  const Info = req.body.Info;
  const grados_b = req.body.Grados_B;
  const p_h = req.body.P_H;
  const acidez = req.body.Acidez;
  const idrecibido = req.body.IdMuestra;
  console.log('Datos recibidos:', req.body)
  // Realizar la consulta SQL para actualizar los datos
  db.query(
    "UPDATE tueste SET humedad= ?, AW=?, color_cielab=?, agtrom=?, densidad=?, curva_granulometrica=?, tipo_tueste=?, info_adicional=?, grados_b=?, p_h=?, acidez=?, cultivo=? WHERE id=?",
    [
      Huemdad,
      A_W,
      Color,
      Agtrom,
      Densidad,
      Curva_granu,
      tipo_tueste,
      Info,
      grados_b,
      p_h,
      acidez,
      idrecibido,  // Asegúrate de que idrecibido es realmente cultivo
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar los datos:", err);  // Para depuración
        return res.status(500).json({ error: "Error al actualizar los datos en la base de datos." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "No se encontró Tueste con el ID ingresado" });
      }

      return res.json({ message: "Datos actualizados correctamente" });
    }
  );
});

//exportar a exel-------------------------------------------------------------------------------
formulario.get("/ExcelPersonas", (req, res) => {
  db.query(
    "SELECT cedula, nombre, tel, email, genero, municipio FROM persona",
    (err, result) => {
      if (err) {
        console.error("Error al obtener datos de MySQL:", error);
        res.status(500).send("Error al obtener datos de MySQL");
      } else {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("persona");

        worksheet.columns = [
          { header: "cedula", key: "cedula" },
          { header: "nombre", key: "nombre" },
          { header: "tel", key: "tel" },
          { header: "email", key: "email" },
          { header: "genero", key: "genero" },
          { header: "municipio", key: "municipio" },
        ];
        result.forEach((persona) => {
          worksheet.addRow(persona);
        });

        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=personas.xlsx"
        );

        workbook.xlsx
          .write(res)
          .then(() => {
            res.end();
          })
          .catch((writeError) => {
            console.error("Error al generar el archivo Excel:", writeError);
            res.status(500).send("Error al generar el archivo Excel");
          });
      }
    }
  );
});
//
//  formulario.post("/Exceldb", (req, res) => {
//   const muestra = req.body.Muestra
//   const query = `SELECT p.cedula as cedula, p.nombre as nombre_persona,
//    p.tel,p.email, p.genero, mun.id as ID_Mun,mun.nombre_mun, 
//    are.id as ID_Area, are.num_areascul, are.tipo_produccion, 
//    are.vereda, are.latitud, are.longitud, cul.id as ID_Cultivo,
//   var.id as ID_Variedad, var.nombre_variedad, cul.edad_cultivo,
//   cul.altura_snm, cul.fertilizacion, cul.organico, cul.hectareas,
//   tb.id as ID_TipoBen, tb.nombre as Nombre_Beneficio, cul.estado_muestra, 
//   rec.id as ID_Recibido, rec.fecha_recibido, rec.humedad AS Humedad_Recibido, 
//   rec.A_W as AW_Recibido, rec.factor as Factor_Recibido, rec.densidad as Densidad_Recibido,
//    rec.color as Color_Recibido, rec.grados_b as GradosB_Recibido, rec.p_h as PH_Recibido, 
//    rec.acidez as Acidez_Recibido, rec.info_adicional as Info_Recibido,fer.id as ID_Fermentado,
//    fer.temperatura as Temp_Fermentado, fer.fermentacion, fer.pH as PH_Fermentado,
//   fer.grados_brix as GradosB_Fermentado, fer.microorganismos, fer.culturing, fer.info_microorganismo,
//   fer.info_culturing, sec.id as ID_Secado, sec.temp_secado as Temp_Secado, sec.humedad_relativa as Humedad_Secado,
//    sec.temp_ambiente, sec.tipo_secado, tc.id as ID_TipoCombustible, tc.nombre as Nombre_TipoCombustible,
//   ts.id as ID_TipoSilo, ts.nombre as Nombre_TipoSilo, sec.secado_continuo,tri.id as ID_Trilla,
//   tri.humedad as Humedad_Trilla, tri.A_W as AW_Trilla, tri.factor as Factor_Trilla, tri.densidad as Densidad_Trilla,
//   tri.color as Color_Trilla, tri.grados_b as GradosB_Trilla, tri.p_h as PH_Trilla, tri.acidez as Acidez_Trilla,
//   tri.info_adicional as Info_Trilla, tues.id as ID_Tueste, tues.humedad as Humedad_Tueste, tues.AW as AW_Tueste, 
//   tues.color_cielab as Color_Tueste, tues.agtrom AS Agtrom_tueste, tues.densidad as Densidad_Tueste, tues.curva_granulometrica, 
//   tues.tipo_tueste, tues.info_adicional as Info_Tueste, sens.id as ID_Sensorial, sens.fragancia, sens.acidez as Acidez_Sensorial,
//   sens.dulzor, sens.sabor, sens.cuerpo, sens.uniformidad, sens.sabor_residual, sens.balance, sens.taza_limpia,
//    sens.total FROM cultivo cul JOIN area_pro are on cul.area_pro=are.id JOIN persona p on are.cedula=p.cedula LEFT JOIN fermentado
//    fer on fer.cultivo=cul.id LEFT JOIN secado sec on sec.cultivo=cul.id JOIN variedad var on var.id=cul.variedad JOIN municipios mun on mun.id=p.municipio 
//    JOIN tipo_beneficio tb on tb.id=cul.tipo_beneficio LEFT JOIN tipo_silo ts on ts.id=sec.tipo_silo 
//    LEFT JOIN tipo_combustible tc on tc.id=sec.tipo_combustible 
//    LEFT JOIN recibido rec on rec.cultivo=cul.id 
//    left JOIN trilla tri on tri.cultivo=cul.id 
//    left JOIN tueste tues on tues.cultivo=cul.id 
//    left JOIN sensorial sens on sens.cultivo=cul.id
//   WHERE cul.id LIKE '${muestra}'`;
//   db.query(query, (err, result) => {
//     if (err) {
//       console.error("Error al obtener datos de MySQL:", err);
//       res.status(500).send("Error al obtener datos de MySQL");
//     } else {
//       const workbook = new ExcelJS.Workbook();
//       const worksheet = workbook.addWorksheet("persona");
//       //const worksheet2 = workbook.addWorksheet('produccion');
//       // const worksheet3 = workbook.addWorksheet('cultivo');

//       worksheet.columns = [
//         //sociodemografico
//         { header: "Cédula", key: "cedula" },
//         { header: "Nombre", key: "nombre_persona" },
//         { header: "Teléfono", key: "tel" },
//         { header: "Email", key: "email" },
//         { header: "Género", key: "genero" },
//         { header: "Municipio", key: "nombre_mun" },
//         //produccion
//         { header: "ID Producción", key: "ID_Area_Pro" },
//         { header: "Num. Área", key: "num_areascul" },
//         { header: "Tipo Produccion", key: "tipo_produccion" },
//         { header: "Vereda", key: "vereda" },
//         { header: "Latitud", key: "latitud" },
//         { header: "Longitud", key: "longitud" },
//         //cultivo
//         { header: "ID Cultivo", key: "ID_Cultivo" },
//         { header: "Hectareas Producidas", key: "hectareas" },
//         { header: "Nombre Variedad", key: "nombre_variedad" },
//         { header: "Edad Cultivo", key: "edad_cultivo" },
//         { header: "Altura SNM", key: "altura_snm" },
//         { header: "Fertilización", key: "fertilizacion" },
//         { header: "Orgánico", key: "organico" },
//         { header: "Tipo Beneficio", key: "Nombre_Beneficio" },
//         //fermentacion
//         { header: "ID Fermentación", key: "ID_Fermentado" },
//         { header: "Temperatura", key: "Temp_Fermentado" },
//         { header: "Fermentación", key: "fermentacion" },
//         { header: "pH", key: "PH_Fermentado" },
//         { header: "Grados Brix", key: "GradosB_Fermentado" },
//         { header: "Microorganismos", key: "microorganismos" },
//         { header: "Culturing", key: "culturing" },
//         //secado
//         { header: "ID Secado", key: "ID_Secado" },
//         { header: "Temp. Secado", key: "Temp_Secado" },
//         { header: "tipo secado", key: "tipo_secado" },
//         { header: "Humedad Relativa", key: "Humedad_Secado" },
//         { header: "Temp. Ambiente", key: "temp_ambiente" },
//         { header: "Tipo Combustible", key: "Nombre_TipoCombustible" },
//         { header: "Tipo Silo", key: "Nombre_TipoSilo" },
//         { header: "Secado Continuo", key: "secado_continuo" },
//         // recibido o caracterizacion
//         { header: "Id Caracterizacion", key: "ID_Recibido" },
//         { header: "Estado Muestra", key: "estado_muestra" },
//         { header: "Fecha Recibido", key: "fecha_recibido" },
//         { header: "Humedad", key: "Humedad_Recibido" },
//         { header: "AW", key: "AW_Recibido" },
//         { header: "Dencidad ", key: "Densidad_Recibido" },
//         { header: "Cielab ", key: "Color_Recibido" },
//         { header: "Grados Brix ", key: "GradosB_Recibido" },
//         { header: "pH ", key: "PH_Recibido" },
//         { header: "Acidez ", key: "Acidez_Recibido" },
//         //trilla
//         { header: "Id Trilla", key: "ID_Trilla" },
//         { header: "Estado Muestra", key: "estado_muestra" },
//         { header: "Humedad", key: "Humedad_Trilla" },
//         { header: "AW", key: "AW_Trilla" },,
//         { header: "Dencidad ", key: "Densidad_Trilla" },
//         { header: "Cielab ", key: "Color_Trilla" },
//         { header: "Grados Brix ", key: "GradosB_Trilla" },
//         { header: "pH ", key: "PH_Trilla" },
//         { header: "Acidez ", key: "Acidez_Trilla" },
//         { header: "Factor ", key: "Factor_Trilla" },
//         //tueste
//         { header: "Id tueste", key: "ID_Tueste" },
//         { header: "Estado Muestra", key: "estado_muestra" },
//         { header: "Humedad", key: "Humedad_Tueste" },
//         { header: "AW", key: "AW_Tueste" },
//         { header: "Dencidad ", key: "Densidad_Tueste" },
//         { header: "Cielab ", key: "Color_Tueste" },
//         { header: "Grados Brix ", key: "GradosB_Tueste" },
//         { header: "pH ", key: "PH_Tueste" },
//         { header: "Acidez ", key: "Acidez_Tueste" },
//         { header: "Agtrom ", key: "Agtrom_tueste" },
//         { header: "curva granulometrica ", key: "curva_granulometrica" },
        
//       ];
//       /* worksheet2.columns = [
//           { header: 'id_produccion', key: 'id_produccion' },
//           { header: 'num_areascul', key: 'num_areascul' },
//           { header: 'tipo_produccion', key: 'nombre_variedad' },
//           { header: 'vereda', key: 'vereda' },
//           { header: 'latitud', key: 'latitud' },
//           { header: 'longitud', key: 'longitud' },
          
//         ];*/
//       result.forEach((persona) => {
//         worksheet.addRow(persona);
//       });

//       res.setHeader(
//         "Content-Type",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//       );
//       res.setHeader("Content-Disposition", "attachment; filename=datos.xlsx");

//       workbook.xlsx
//         .write(res)
//         .then(() => {
//           res.end();
//         })
//         .catch((writeError) => {
//           console.error("Error al generar el archivo Excel:", writeError);
//           res.status(500).send("Error al generar el archivo Excel");
//         });
//     }
//   });
// });
// todo pero en dos columnas
formulario.post("/Excelcolums", (req, res) => {
  const muestra = req.body.Muestra
  const query = `SELECT p.cedula as cedula, p.nombre as nombre_persona,
  p.tel,p.email, p.genero, mun.id as ID_Mun,mun.nombre_mun, 
  are.id as ID_Area, are.num_areascul, are.tipo_produccion, 
  are.vereda, are.latitud, are.longitud, cul.id as ID_Cultivo,
  var.id as ID_Variedad, var.nombre_variedad, cul.edad_cultivo,
  cul.altura_snm, cul.fertilizacion, cul.organico, cul.hectareas,
  tb.id as ID_TipoBen, tb.nombre as Nombre_Beneficio, cul.estado_muestra, 
  rec.id as ID_Recibido, rec.fecha_recibido, rec.humedad AS Humedad_Recibido, 
  rec.A_W as AW_Recibido, rec.factor as Factor_Recibido, rec.densidad as Densidad_Recibido,
  rec.color as Color_Recibido, rec.grados_b as GradosB_Recibido, rec.p_h as PH_Recibido, 
  rec.acidez as Acidez_Recibido, rec.info_adicional as Info_Recibido,fer.id as ID_Fermentado,
  fer.temperatura as Temp_Fermentado, fer.fermentacion, fer.pH as PH_Fermentado,
  fer.grados_brix as GradosB_Fermentado, fer.microorganismos, fer.culturing, fer.info_microorganismo,
  fer.info_culturing, sec.id as ID_Secado, sec.temp_secado as Temp_Secado, sec.humedad_relativa as Humedad_Secado,
  sec.temp_ambiente, sec.tipo_secado, tc.id as ID_TipoCombustible, tc.nombre as Nombre_TipoCombustible,
  ts.id as ID_TipoSilo, ts.nombre as Nombre_TipoSilo, sec.secado_continuo,tri.id as ID_Trilla,
  tri.humedad as Humedad_Trilla, tri.A_W as AW_Trilla, tri.factor as Factor_Trilla, tri.densidad as Densidad_Trilla,
  tri.color as Color_Trilla, tri.grados_b as GradosB_Trilla, tri.p_h as PH_Trilla, tri.acidez as Acidez_Trilla,
  tri.info_adicional as Info_Trilla, tues.id as ID_Tueste, tues.humedad as Humedad_Tueste, tues.AW as AW_Tueste, 
  tues.color_cielab as Color_Tueste, tues.agtrom AS Agtrom_tueste, tues.densidad as Densidad_Tueste, tues.curva_granulometrica, 
  tues.tipo_tueste, tues.info_adicional as Info_Tueste, sens.id as ID_Sensorial, sens.fragancia, sens.acidez as Acidez_Sensorial,
  sens.dulzor, sens.sabor, sens.cuerpo, sens.uniformidad, sens.sabor_residual, sens.balance, sens.taza_limpia,
  sens.total FROM cultivo cul JOIN area_pro are on cul.area_pro=are.id JOIN persona p on are.cedula=p.cedula LEFT JOIN fermentado
  fer on fer.cultivo=cul.id LEFT JOIN secado sec on sec.cultivo=cul.id JOIN variedad var on var.id=cul.variedad JOIN municipios mun on mun.id=p.municipio 
  JOIN tipo_beneficio tb on tb.id=cul.tipo_beneficio LEFT JOIN tipo_silo ts on ts.id=sec.tipo_silo 
  LEFT JOIN tipo_combustible tc on tc.id=sec.tipo_combustible 
  LEFT JOIN recibido rec on rec.cultivo=cul.id 
  left JOIN trilla tri on tri.cultivo=cul.id 
  left JOIN tueste tues on tues.cultivo=cul.id 
  left JOIN sensorial sens on sens.cultivo=cul.id
  WHERE cul.id LIKE '${muestra}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener datos de MySQL:", err);
      res.status(500).send("Error al obtener datos de MySQL");
    } else {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("datos");
      //const worksheet2 = workbook.addWorksheet('produccion');
      // const worksheet3 = workbook.addWorksheet('cultivo');
      const resultado = result
      const rescolums = [
        //sociodemografico
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "SOCIODEMOGRAFICO", key: "" },
        { header: "Cédula", key: "cedula" },
        { header: "Nombre", key: "nombre_persona" },
        { header: "Teléfono", key: "tel" },
        { header: "Email", key: "email" },
        { header: "Género", key: "genero" },
        { header: "Municipio", key: "nombre_mun" },
        //produccion
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "PRODUCCION", key: "" },
        { header: "ID Producción", key: "ID_Area_Pro" },
        { header: "Num. Área", key: "num_areascul" },
        { header: "Tipo Produccion", key: "tipo_produccion" },
        { header: "Vereda", key: "vereda" },
        { header: "Latitud", key: "latitud" },
        { header: "Longitud", key: "longitud" },
        //cultivo
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "CULTIVO", key: "" },
        { header: "ID Cultivo", key: "ID_Cultivo" },
        { header: "Hectareas Producidas", key: "hectareas" },
        { header: "Nombre Variedad", key: "nombre_variedad" },
        { header: "Edad Cultivo", key: "edad_cultivo" },
        { header: "Altura SNM", key: "altura_snm" },
        { header: "Fertilización", key: "fertilizacion" },
        { header: "Orgánico", key: "organico" },
        { header: "Tipo Beneficio", key: "Nombre_Beneficio" },
        //fermentacion
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "FERMENTACION", key: "" },
        { header: "ID Fermentación", key: "ID_Fermentado" },
        { header: "Temperatura", key: "Temp_Fermentado" },
        { header: "Fermentación", key: "fermentacion" },
        { header: "pH", key: "PH_Fermentado" },
        { header: "Grados Brix", key: "GradosB_Fermentado" },
        { header: "Microorganismos", key: "microorganismos" },
        { header: "Culturing", key: "culturing" },
        //secado
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "SECADO", key: "" },
        { header: "ID Secado", key: "ID_Secado" },
        { header: "Temp. Secado", key: "Temp_Secado" },
        { header: "tipo secado", key: "tipo_secado" },
        { header: "Humedad Relativa", key: "Humedad_Secado" },
        { header: "Temp. Ambiente", key: "temp_ambiente" },
        { header: "Tipo Combustible", key: "Nombre_TipoCombustible" },
        { header: "Tipo Silo", key: "Nombre_TipoSilo" },
        { header: "Secado Continuo", key: "secado_continuo" },
        // recibido o caracterizacion
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "CARACTERIZACION", key: "" },
        { header: "Id Caracterizacion", key: "ID_Recibido" },
        { header: "Estado Muestra", key: "estado_muestra" },
        { header: "Fecha Recibido", key: "fecha_recibido" },
        { header: "Humedad", key: "Humedad_Recibido" },
        { header: "AW", key: "AW_Recibido" },
        { header: "Dencidad ", key: "Densidad_Recibido" },
        { header: "Cielab ", key: "Color_Recibido" },
        { header: "Grados Brix ", key: "GradosB_Recibido" },
        { header: "pH ", key: "PH_Recibido" },
        { header: "Acidez ", key: "Acidez_Recibido" },
        //trilla
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "TRILLA", key: "" },
        { header: "Id Trilla", key: "ID_Trilla" },
        { header: "Estado Muestra", key: "estado_muestra" },
        { header: "Humedad", key: "Humedad_Trilla" },
        { header: "AW", key: "AW_Trilla" },,
        { header: "Dencidad ", key: "Densidad_Trilla" },
        { header: "Cielab ", key: "Color_Trilla" },
        { header: "Grados Brix ", key: "GradosB_Trilla" },
        { header: "pH ", key: "PH_Trilla" },
        { header: "Acidez ", key: "Acidez_Trilla" },
        { header: "Factor ", key: "Factor_Trilla" },
        //tueste
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "", key: "" },
        { header: "TUESTE", key: "" },
        { header: "Id tueste", key: "ID_Tueste" },
        { header: "Estado Muestra ", key: "estado_muestra" },
        { header: "Humedad ", key: "Humedad_Tueste" },
        { header: "AW", key: "AW_Tueste" },
        { header: "Dencidad ", key: "Densidad_Tueste" },
        { header: "Cielab ", key: "Color_Tueste" },
        { header: "Grados Brix ", key: "GradosB_Tueste" },
        { header: "pH ", key: "PH_Tueste" },
        { header: "Acidez ", key: "Acidez_Tueste" },
        { header: "Agtrom ", key: "Agtrom_tueste" },
        { header: "curva granulometrica ", key: "curva_granulometrica" },
        
      ];
      
        resultado.forEach((row) => {
          const rowData = []
         rescolums.map((column) => {
           rowData[2]= column.header
           rowData[6]= row[column.key]
           worksheet.addRow(rowData)
         
         });
       });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", "attachment; filename=datos.xlsx");

      workbook.xlsx
        .write(res)
        .then(() => {
          res.end();
        })
        .catch((writeError) => {
          console.error("Error al generar el archivo Excel:", writeError);
          res.status(500).send("Error al generar el archivo Excel");
        });
    }
  });
});

// pruba por tablas
// formulario.post("/exportarmuestra",(req,res)=>{
//   const muestra = req.body.Muestra
//  const queryPersona = (`SELECT per.* FROM cultivo AS  cul LEFT JOIN area_pro As are ON 
//  cul.area_pro = are.id LEFT JOIN persona AS per  ON per.cedula = are.cedula WHERE cul.id LIKE "${muestra}"`)
//  db.query(queryPersona,(err,resultpersona)=>{
  
//   if(err){
//     console.error("Error al obtner resultados", err)
//     res.status(500).send("error al obtener los datos de sociodemografico")
//     return
//   }
//     const datapersona= resultpersona
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Datos");
//     const socioDemograficoColumns = [
//       { header: "Cédula", key: "cedula" },
//       { header: "Nombre", key: "nombre" },
//       { header: "Teléfono", key: "tel" },
//       { header: "Email", key: "email"},
//       { header: "municipio", key: "municipio" },
//     ];  
//     const header = []
//     header[2]= "Tabla Socio Demográfico"
//    worksheet.addRow(header);

//   datapersona.forEach((row) => {
//      const rowData = []
//     socioDemograficoColumns.map((column) => {
//       rowData[2]= column.header
//       rowData[3]= row[column.key]
//       worksheet.addRow(rowData)
    
//     });
//   });
  
//   worksheet.addRow([]);
//   // siguiente busqueda
//    const queryProduccion = (`SELECT are.* FROM cultivo AS  cul LEFT JOIN area_pro As are ON 
//    cul.area_pro = are.id LEFT JOIN persona AS per  ON per.cedula = are.cedula WHERE cul.id LIKE "${muestra}"`)
//    db.query(queryProduccion,(err,resultProducion)=>{
//     if(err){
//       console.error("Error al obtner resultados", err)
//       res.status(500).send("error al obtener los datos de Produccion")
//     }
//     console.log("produccion")
//      const areaPro = resultProducion
//      const areaProColumns = [
//       {header:"Id" , key:"id"}, 
//       {header:"area cultivada" , key:"num_areascul"}, 
//       {header:"Tipo de produccion" , key:"num_areascul"}, 
//       {header:"Vereda" , key:"vereda"}, 
//       {header:"latitud" , key:"latitud"}, 
//       {header:"longitud" , key:"longitud"}, 
//      ]
//      const prod =[]
//      prod[7] = "Tabla PRODUCCION"
//     worksheet.addRow(prod);
//     areaPro.forEach((row) => {
//       const rowData = []
//      areaProColumns.map((column) => {
//        rowData[2]= column.header
//        rowData[4]= row[column.key]
//        worksheet.addRow(rowData)
     
//      });

//    });

//    // busqueda del cultivo
//     const cultivoQuery=(`SELECT cul.id, var.nombre_variedad, cul.edad_cultivo,cul.altura_snm, 
//         cul.fertilizacion,cul.organico,cul.hectareas, tp.nombre, cul.estado_muestra
//         FROM
//             cultivo AS cul
//         LEFT JOIN area_pro AS are
//         ON
//             cul.area_pro = are.id
//         LEFT JOIN persona AS per
//         ON
//             per.cedula = are.cedula
//         LEFT JOIN variedad AS var 
//         on 
//           var.id = cul.variedad
//         LEFT JOIN tipo_beneficio AS tp on tp.id = cul.tipo_beneficio
//         WHERE
//             cul.id LIKE "${muestra}"`)
//     db.query(cultivoQuery,(err,resultCultivo)=>{
//       if(err){
//         console.error("Error al obtner resultados", err)
//         res.status(500).send("error al obtener los datos de Cultivo")
//       }
//        const cultivores = resultCultivo
//        const cultivoColumns = [
//         {header:"Id" , key:"id"}, 
//         {header:"Variedad" , key:"nombre_variedad"}, 
//         {header:"Edad Cultivo" , key:"edad_cultivo"}, 
//         {header:"Altura SNM" , key:"altura_snm"}, 
//         {header:"Fertilizacion" , key:"fertilizacion"}, 
//         {header:"Organico" , key:"organico"}, 
//         {header:"Hectareas producidas" , key:"hectareas"}, 
//         {header:"Tipo Beneficio" , key:"nombre"}, 
//         {header:"Estado de muestra" , key:"estado_muestra"}, 
//        ]
//        const cultivo = [ ]
//        cultivo[2] = "Tabla Cultivo"
//       worksheet.addRow(cultivo);
//       cultivores.forEach((row) => {
//         const rowData = []
//        cultivoColumns.map((column) => {
//          rowData[2]= column.header
//          rowData[4]= row[column.key]
//          worksheet.addRow(rowData)
       
//        });
  
//      });
//     worksheet.addRow([]);
//     res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
//     res.setHeader("Content-Disposition", "attachment; filename=datos.xlsx");
  
//     // Generar y enviar el archivo Excel como respuesta
//     workbook.xlsx.write(res)
//       .then(() => {
//         res.end();
//       })
//       .catch((error) => {
//         console.log("catch")
//         console.error("Error al generar el archivo Excel:", error);
//         res.status(500).send("Error al generar el archivo Excel");
//       });
//     })
 

   
//    })
// })

// })
// validar login ------------------------------------------
formulario.post("/login", (req, res) => {
  const { username, password } = req.body;
  const jwt = require("jsonwebtoken");
  const crypto = require("crypto");
  const query = `SELECT * FROM usuario WHERE usuario = '${username}' AND contraseña = '${password}'`;
  // console.log(username)
  try {
    db.query(query, (error, results) => {
      if (error) {
        console.error("Error al realizar la consulta: " + error.stack);
        res.status(500).json({ message: "Error al autenticar el usuario" });
        return;
      }

      if (results.length > 0) {
        const data = results;
        const token = crypto.randomBytes(64).toString("hex");
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 3600000,
        });

        res.status(200).json({ token, data });
      } else {
        res.status(401).json({ message: "Credenciales inválidas" });
      }
    });
  } catch (error) {
    console.error("Error inesperado: " + error);
    res.status(500).json({ message: "Error inesperado al autenticar el usuario" });
  }
});
//puerto del server
formulario.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});