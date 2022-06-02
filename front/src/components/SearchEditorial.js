import React, { useState } from 'react';


const SearchEditorial = () => {
    const [edit, setEditorial] = useState([]);
    const [newEdit, setNewEdit] = useState({
        "nombre_editorial" : ""
    });

    const [errors, setErrors] = useState(undefined);
    const checkValues = () => {
        const err = new Map();
        if (newEdit["nombre_editorial"] === "") {
            err.set('nombre_editorial', 'El nombre de la editorial no puede estar vacio.');
        }
        return err;
    }
    
    const deleteEditorial = async id => {
        try{
            console.log(id);
            const deleteEditorial = await fetch(`http://localhost:3000/delete_editorial/${id}`, {
                method: 'DELETE'
            });
            setEditorial({});
        } catch(err){
            console.error(err.message);
        }
    };
    
    const editorial = newEdit["nombre_editorial"];
    const handleChange = (key,e) => {
        let updateValue = {...newEdit};
        updateValue[key] = e.target.value;
        setNewEdit(updateValue);
     }

        const handleSubmit = async (e) => {
        e.preventDefault();
        const errorAux = checkValues();
        setErrors(errorAux);


        if (errorAux.size === 0) {
            try {
                const showEditorial = await fetch(`http://localhost:3000/show_editorial/${editorial}`, {
                    method: 'GET'
                });
                const jsonData = await showEditorial.json();
                setEditorial(jsonData[0]);
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
            <h2 className='text-center'>Editoriales</h2>
            <div className='border-bottom border-1'>
                <h6>Buscar editorial: </h6>
                <form onSubmit={handleSubmit}>
                    <div class="row mb-3">
                        <div class="col-3">
                            <input type="text" class="form-control" placeholder="Nombre Editorial" aria-label="Nombre Editorial" onChange={(e) => handleChange('nombre_editorial', e)}/>
                        </div>
                        <div class="col-2">
                            <button type="submit" class="btn btn-outline-primary">Buscar</button>
                        </div>
                    </div>
                </form>
            </div>
            {
                edit.length !== 0 && 
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
                            <tr key={edit["id_editorial"]}>
                                <td>{edit["nombre_editorial"]}</td>
                                <td>{edit["telefono"]}</td>
                                <th><button className='btn btn-warning'>Editar</button></th>
                                <th><button className='btn btn-danger' 
                                 onClick={() => deleteEditorial(edit.editorial)}>Eliminar</button></th>
                            </tr>
                    </tbody>
                </table>
            </div>
            }
        </>
    );
};

export default SearchEditorial;