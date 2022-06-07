import React, { useState } from 'react';
import EditStudent from './EditStudent';


const ShowStudents = () => {
    const [students, setStudents] = useState([]);
    const deleteStudents = async id => {
        try{
            console.log(id);
            const deleteStudents = await fetch(`http://localhost:3000/delete_student/${id}`, {
                method: 'DELETE'
            });
            setStudents(students.filter(estudiante => estudiante.id_lector !== id));
        } catch(err){
            console.error(err.message);
        }
    };
    const getStudents = async () => {
        try {
            const response = await fetch("http://localhost:3000/show_students");
            const jsonData = await response.json();
            setStudents(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };
    return (
        <>
            <div className='border-bottom border-1'>
                <div className='d-flex justify-content-center'>
                    <button type="button" class="btn btn-outline-info my-3 me-3" onClick={getStudents}>Mostrar estudiantes</button>
                    {students.length !== 0 && 
                        <button type="button" class="btn btn-outline-danger my-3 mr-3" onClick={(e) => setStudents([])}>Ocultar estudiantes</button>
                    }
                </div>
            </div>
            {students.length !== 0 && 
                <div>
                    <table className='table mt-2 text-center'>
                        <thead>
                            <tr>
                                <th>CI</th>
                                <th>Nombre</th>
                                <th>Direccion</th>
                                <th>Carrera</th>
                                <th>Edad</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id_lector}>
                                    <td>{student.ci}</td>
                                    <td>{student.nombre}</td>
                                    <td>{student.direccion}</td>
                                    <td>{student.nombre_programa}</td>
                                    <td>{student.edad}</td>
                                    <th><EditStudent infoStudent = {student} /></th>
                                    <th><button className='btn btn-danger' 
                                    onClick={() => deleteStudents(student.id_lector)}>Eliminar</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
};
export default ShowStudents;