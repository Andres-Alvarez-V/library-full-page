import React from 'react';
import AddNewStudent from '../components/AddNewStudent';
import ShowStudents from '../components/ShowStudents';
import SearchStudent from '../components/SearchStudent';

const Estudiantes = () => {


    return (
    <div className='mx-4'>
        <SearchStudent/>
        <AddNewStudent/>
        <ShowStudents/>
        
    </div> 
    );
};

export default Estudiantes;