import React from 'react';
import { Link } from 'react-router-dom';

const NoFoundPage = () => (
    <div className='container'>
        <div className="jumbotron mt-5">
            <h1 className="display-4">404 No Found !</h1>
            <p className="lead">Pagina no encontrada</p>
            <hr className="my-4" />
            <Link className="btn btn-primary btn-lg" to='/' role="button">Volver al inicio</Link>
        </div>
    </div>
);

export default NoFoundPage;
