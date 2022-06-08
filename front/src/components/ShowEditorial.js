import React, { useState } from 'react';
import EditEditorial from './EditEditorial';


const ShowEditorial = () => {
    const [edits, setEdits] = useState([]);
    const deleteEditorial = async id_editorial => {
        try{
            console.log(id_editorial);
            const deleteEditorial = await fetch(`http://localhost:3000/delete_editorial/${id_editorial}`, {
                method: 'DELETE'
            });
            setEdits(edits.filter(editorial => editorial.id_editorial !== id_editorial));
        } catch(err){
            console.error(err.message);
        }
    };
    const getEdits = async () => {
        try {
            const response = await fetch("http://localhost:3000/show_editorial");
            const jsonData = await response.json();
            setEdits(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };
    return (
        <>
            <div className='border-bottom border-1'>
                <div className='d-flex justify-content-center'>
                    <button type="button" class="btn btn-outline-info my-3 me-3" onClick={getEdits}>Mostrar editoriales</button>
                    {edits.length !== 0 && 
                        <button type="button" class="btn btn-outline-danger my-3 mr-3" onClick={(e) => setEdits([])}>Ocultar editoriales</button>
                    }
                </div>
            </div>
            {edits.length !== 0 && 
                <div>
                    <table className='table mt-2 text-center'>
                        <thead>
                            <tr>
                            <th>Nombre Editorial</th>
                            <th>Teléfono</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {edits.map(edit => (
                                <tr key={edit.id_editorial}>
                                    <td>{edit.nombre_editorial}</td>
                                    <td>{edit.telefono}</td>
                                    <th><EditEditorial infoEditorial = {edit} /></th>
                                    <th><button className='btn btn-danger' 
                                    onClick={() => deleteEditorial(edit.id_editorial)}>Eliminar</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
};
export default ShowEditorial;