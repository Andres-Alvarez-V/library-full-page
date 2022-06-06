import React from 'react';
import AddNewPrestamo from '../components/AddNewPrestamo';
import ShowPrestamo from '../components/ShowPrestamo';
import SearchPrestamo from '../components/SearchPrestamo';

const Prestamos = () => {


    return (
    <div className='mx-4'>
        <SearchPrestamo/>
        <AddNewPrestamo/>
        <ShowPrestamo/>
        
    </div> 
    );
};

export default Prestamos;