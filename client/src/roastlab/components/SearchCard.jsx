import { Link } from "react-router-dom"
export const SearchCard = ({

}) =>{
    return (
        <div className="col animate__animated animate__fadeIn">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-4">
                        <img src={ id } id="card-img" className="card-img" alt={ superhero } />
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">S12</h5>
                            <p className="card-text">Si</p>
                            
                            <p className="card-text">
                                <small> s</small>
                            </p>
                            <Link to={`/hero/${ id }`}>
                            Mas...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
