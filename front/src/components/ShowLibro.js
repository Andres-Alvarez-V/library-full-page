import React, { useState } from 'react';


const ShowLibro = () => {
    const [libros, setLibros] = useState([]);

    const deleteLibros = async id => {
        try{
            console.log(id);
            const deletePrestamos = await fetch(`http://localhost:3000/delete_libros/${id}`, {
                method: 'DELETE'
            });
            setLibros(libros.filter(libro => libro.id_libro !== id));
        } catch(err){
            console.error(err.message);
        }
    };

    const getLibros = async () => {
        try {
            const response = await fetch("http://localhost:3000/show_libros");
            const jsonData = await response.json();
            setLibros(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <div className='border-bottom border-1'>
                <div className='d-flex justify-content-center'>
                    <button type="button" class="btn btn-outline-info my-3 me-3" onClick={getLibros}>Mostrar libros</button>
                    {libros.length !== 0 && 
                        <button type="button" class="btn btn-outline-danger my-3 mr-3" onClick={(e) => setLibros([])}>Ocultar libros</button>
                    }
                </div>
            </div>
            {libros.length !== 0 && 
                <div>
                    <table className='table mt-2 text-center'>
                        <thead>
                            <tr>
                            <th>Titulo</th>
                            <th>Nombre</th>
                            <th>Editorial</th>
                            <th>area</th>
                            <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {libros.map(libro => (
                                <tr key={libro.id_libro}>
                                    <td>{libro.titulo}</td>
                                    <td>{libro.area}</td>
                                    <td>{libro.editorial}</td>
                                    <th><button className='btn btn-danger' 
                                    onClick={() => deleteLibros(libro.id_libro)}>Eliminar</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
};
export default ShowLibro;