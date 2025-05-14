import { Link } from 'react-router-dom';
export const FormMenu = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col mx-auto text-center">
        <Link className="btn" style={{backgroundColor:'#861521', width:'30vh', height:'42vh', boxShadow:'0px 0px 6px black'}} to="/add">
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1686340125~exp=1686340725~hmac=c4bebc3a9332bf5714e0cf41030981c35fe952602ea36276abd23590f5b65b77" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title ">Usuario</h5>
              <button className="btn btn-primary">
                Crear Usuario
              </button>
            </div>
          </div>
          </Link>
        </div>
        <div className="col mx-auto text-center ">
        <Link className="btn" style={{backgroundColor:'#861521', width:'30vh', height:'42vh', boxShadow:'0px 0px 6px black'}} to="/produccion">
        <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/1191/1191560.png?w=740&t=st=1686341447~exp=1686342047~hmac=f4bc97e131de86eec575ac2182087cc3e0b111f2ac69f2f297d0d8d68e2e1ee9" className="card-img-top" alt="..." />
            <div className="card-body ">
              <h5 className="card-title ">Produccion</h5>
              <button className="btn btn-primary">
                Crear Producción
              </button>
            </div>
          </div>
          </Link>
        </div>
        <div className="col col mx-auto text-center">
        <Link className="btn" style={{backgroundColor:'#861521', width:'30vh', height:'42vh', boxShadow:'0px 0px 6px black'}} to="/cultivo">
            <div className="card mx-auto text-center"  >
            <img src="https://cdn-icons-png.flaticon.com/512/1241/1241438.png?w=740&t=st=1686341518~exp=1686342118~hmac=46564be90d94b4278be50ca9b1269b479e63694eddc43842b49edf579383199c" className="card-img-top" alt="..." />
            <div className="card-body ">
              <h5 className="card-title ">Cultivo</h5>
              <button href="#" className="btn btn-primary">
                Crear Cultivo
              </button>
            </div>
          </div>
            </Link>
          </div>
      </div>
    </div>
  );
};
