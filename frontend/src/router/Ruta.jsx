import React from 'react'
import { NavLink, Outlet} from 'react-router-dom'
import RutaAnidada from './RutaAnidada'

const Ruta = () => {
    return (
        <div>
            <h1>hello world</h1>

            <NavLink className="btn btn-success" to="rutaAnidada"> Ruta link</NavLink>

            
            <Outlet/>

        </div>
    )
}

export default Ruta
