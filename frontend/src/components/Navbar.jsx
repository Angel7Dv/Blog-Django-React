import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to='/'>Blog Lyfe</Link>
        <button 
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className={(is_active)=> is_active ? "active" : "" ,"nav-link "  } to='/'>Home</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="btn btn-success" to="ruta"> Ruta link</NavLink>
                </li>
                <li className="nav-item ">
                    <NavLink className="nav-link" to='/blog'>Blog <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item ">
                    <NavLink className="nav-link" to="/blogList">Blog List <span className="sr-only">(current)</span></NavLink>
                </li>
            </ul>
    </nav>
);

export default navbar;
