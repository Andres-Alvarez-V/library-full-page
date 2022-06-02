import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Error404 from '../pages/Error404';
import Home from '../pages/Home';
import Estudiantes from '../pages/Estudiantes';
import Editoriales from '../pages/Editoriales';
import Header from './Header';


const Principal = () => {
    return (
        <>
                <Header/>
                <Routes>
                    <Route path = "/" element = { <Home/>} /> 
                    <Route path = "/estudiantes" element = { <Estudiantes/>} />
                    <Route path = "/editoriales" element = { <Editoriales/>} />
                    <Route path = "*" element = { <Error404/>} />
                </Routes>
        </>
    );
};

export default Principal;