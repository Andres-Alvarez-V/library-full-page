import React, { useState } from 'react';
import EditStudent from './EditStudent';


const SearchStudent = () => {
    const [students, setStudents] = useState([]);
    const [newInfo, setNewInfo] = useState({
        "tipo_documento" : "CC",
        "numero_documento" : ""
    });

    const [errors, setErrors] = useState(undefined);
    const checkValues = () => {
        const err = new Map();
        if (newInfo["numero_documento"] === "") {
            err.set('numero_documento', 'Num Documento no puede estar vacio.');
        }
        return err;
    }
    
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
    
    
    const handleChange = (key,e) => {
        let updateValue = {...newInfo};
        updateValue[key] = e.target.value;
        setNewInfo(updateValue);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorAux = checkValues();
        setErrors(errorAux);


        if (errorAux.size === 0) {
            try {
                const ci = newInfo["tipo_documento"]+"-"+newInfo["numero_documento"];
                console.log(ci);
                const showStudents = await fetch(`http://localhost:3000/show_student/${ci}`, {
                    method: 'GET'
                });
                const jsonData = await showStudents.json();
                setStudents(jsonData);
            } catch (err) {
                console.log(err.message);
            }
        } else {
            setTimeout(() => {
                setErrors(undefined);
            }, 3000);
            console.log(errorAux);
        }
    }

    return (
        <>
            <h2 className='text-center'>Estudiantes</h2>
            <div className='border-bottom border-1'>
                <h6 className=' fw-bold '>Buscar estudiante: </h6>
                <form onSubmit={handleSubmit}>
                    <div class="row mb-3">
                        <div class="col-2">
                            <select class="form-select" aria-label="Default select example" onChange={(e) => handleChange('tipo_documento', e)}>
                                <option value="CC" selected>CC</option>
                                <option value="TI">TI</option>
                                <option value="CE">CE</option>
                            </select>
                        </div>
                        <div class="col-3">
                            <input type="text" class="form-control" placeholder="Num Documento" aria-label="Num Documento" onChange={(e) => handleChange('numero_documento', e)}/>
                        </div>
                        <div class="col-2">
                            <button type="submit" class="btn btn-outline-primary">Buscar</button>
                        </div>
                    </div>
                </form>
            </div>
            {
                students.length !== 0 && 
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

export default SearchStudent;