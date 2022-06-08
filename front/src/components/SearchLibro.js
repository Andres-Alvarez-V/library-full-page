import React, { useState } from 'react';


const SearchLibro = () => {
    const [libros, setLibros] = useState([]);
    const [newLibro, setNewLibro] = useState("");

    const [errors, setErrors] = useState(undefined);
    const checkValues = () => {
        const err = new Map();
        if (newLibro === "") {
            err.set('titulo', 'Titulo no puede estar vacio.');
        }
        return err;
    }
    
    const deleteLibros = async id => {
        try{
            console.log(id);
            const deleteLibros = await fetch(`http://localhost:3000/delete_libro/${id}`, {
                method: 'DELETE'
            });
            setLibros(libros.filter(libro => libro.id_libro !== id));
        } catch(err){
            console.error(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorAux = checkValues();
        setErrors(errorAux);


        if (errorAux.size === 0) {
            try {   
                console.log(newLibro)
                const showLibro = await fetch(`http://localhost:3000/show_libro/${newLibro}`, {
                    method: 'GET'
                });
                const jsonData = await showLibro.json();
                setLibros(jsonData);
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

    console.log(newLibro)

    return (
        <>
            <h2 className='text-center'>Libros</h2>
            <div className='border-bottom border-1'>
                <h6 className=' fw-bold '>Buscar libro: </h6>
                <form onSubmit={handleSubmit}>
                    <div class="row mb-3">
                    <div class="col-3">
                            <input type="text" class="form-control" placeholder="Titulo" aria-label="titulo" onChange={(e) => setNewLibro(e.target.value) }/>
                        </div>
                        <div class="col-2">
                            <button type="submit" class="btn btn-outline-primary">Buscar</button>
                        </div>
                    </div>
                </form>
            </div>
            {
                libros.length !== 0 && 
                <div>
                <table className='table mt-2 text-center'>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Editorial</th>
                            <th>Area</th>
                            <th>Editar</th>
                            <th>Eliminar</th>

                        </tr>
                    </thead>
                    <tbody>
                            {libros.map(libro => (
                                <tr key={libro.id_lector}>
                                    <td>{libro.ci}</td>
                                    <td>{libro.nombre}</td>
                                    <td>{libro.direccion}</td>
                                    <td>{libro.nombre_programa}</td>
                                    <td>{libro.edad}</td>
                                    <th><button className='btn btn-warning' 
                                        onClick={() => deleteLibros(libro.id_libro)}>Editar</button></th>
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

export default SearchLibro;