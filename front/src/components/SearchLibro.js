import React, { useState } from 'react';


const SearchLibro = () => {
    const [libroo, setLibro] = useState([]);
    const [newLibro, setNewLibro] = useState({
        "titulo" : ""
    });

    const [errors, setErrors] = useState(undefined);
    const checkValues = () => {
        const err = new Map();
        if (newLibro["titulo"] === "") {
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
            setLibro({});
        } catch(err){
            console.error(err.message);
        }
    };
    
    const libro = newLibro["titulo"];
    const handleChange = (key,e) => {
        let updateValue = {...newLibro};
        updateValue[key] = e.target.value;
        setNewLibro(updateValue);
     }

        const handleSubmit = async (e) => {
        e.preventDefault();
        const errorAux = checkValues();
        setErrors(errorAux);


        if (errorAux.size === 0) {
            try {
                const showLibro = await fetch(`http://localhost:3000/show_libro/${libro}`, {
                    method: 'GET'
                });
                const jsonData = await showLibro.json();
                setLibro(jsonData[0]);
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
            <h2 className='text-center'>Libros</h2>
            <div className='border-bottom border-1'>
                <h6 className=' fw-bold '>Buscar libro: </h6>
                <form onSubmit={handleSubmit}>
                    <div class="row mb-3">
                    <div class="col-3">
                            <input type="text" class="form-control" placeholder="Titulo" aria-label="titulo" onChange={(e) => handleChange('titulo', e)}/>
                        </div>
                        <div class="col-2">
                            <button type="submit" class="btn btn-outline-primary">Buscar</button>
                        </div>
                    </div>
                </form>
            </div>
            {
                libro.length !== 0 && 
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
                            <tr key={libroo["id_libro"]}>
                                <td>{libroo["titulo"]}</td>
                                <td>{libroo["id_editorial"]}</td>
                                <td>{libroo["id_area"]}</td>
                                <th><button className='btn btn-warning' 
                                onClick={() => deleteLibros(libroo.id_libro)}>Editar</button></th>
                                <th><button className='btn btn-danger' 
                                 onClick={() => deleteLibros(libroo.id_libro)}>Eliminar</button></th>
                            </tr>
                    </tbody>
                </table>
            </div>
            }
        </>
    );
};

export default SearchLibro;