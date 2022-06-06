import React from 'react';
import AddNewEditorial from '../components/AddNewEditorial';
import ShowEditorial from '../components/ShowEditorial';
import SearchEditorial from '../components/SearchEditorial';

const Editoriales = () => {


    return (
    <div className='mx-4'>
        <SearchEditorial/>
        <AddNewEditorial/>
        <ShowEditorial/>
        
    </div> 
    );
};

export default Editoriales;