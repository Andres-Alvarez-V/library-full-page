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
                                    <li><Link className="dropdown-item" to="/libros">Libros</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
        <div class="card card-image">
            <div class="text-white text-center rgba-stylish-strong py-5 px-4">
            <div class="py-5">
                <h1 class="card-title h1 my-4 py-2">Biblioteca EAFIT</h1>
                <p class="mb-4 pb-2 px-md-5 mx-md-5">Bienvenidos al sistema de Préstamo de libros de la Biblioteca - Universidad EAFIT. 
                En esta página podrás realizar el registro de estudiantes, libros, editoriales y por supuesto inscribir los préstamos 
                realizados por los estudiantes, además de esto podrás verificar cuáles de ellos tienen multas (multas pagas - multas pendientes) 
                y cuáles han realizado la respectiva devolución, te invitamos a explorar lo que tenemos para ofrecerte.</p>
            </div>
            </div>
        </div>
        <br></br>
        </>
        
    );
}

export default Header