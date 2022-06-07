import React from 'react';
import AddNewLibro from '../components/AddNewLibro';
import ShowLibro from '../components/ShowLibro';
import SearchLibro from '../components/SearchLibro';

const Libros = () => {


    return (
    <div className='mx-4'>
        <SearchLibro/>
        <AddNewLibro/>
        <ShowLibro/>
        
    </div> 
    );
};

export default Libros;