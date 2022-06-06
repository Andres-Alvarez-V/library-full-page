import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return(
        <>

        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Opciones
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/estudiantes">Estudiantes</Link></li>
                                    <li><Link className="dropdown-item" to="/editoriales">Editoriales</Link></li>
                                    <li><Link className="dropdown-item" to="/prestamos">Prestamos</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        <div class="p-4 p-md-5 mb-4 text-white bg-dark" id="hola">
            <div class="col-md-6 px-0">
            <h1 class="display-4 fst-italic">Biblioteca EAFIT</h1>
            <p class="lead my-3">Este sistema permite realizar prestamo de libros a estudiantes de la universidad EAFIT</p>
            </div>
        </div>

        </>
        
    );
}

export default Header