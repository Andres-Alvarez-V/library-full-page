import React, { useState, useEffect } from 'react';

const AddNewLibro= () => {

    const [errors, setErrors] = useState(undefined);
    const [fetchSuccess, setFetchSuccess] = useState(0);
    const [libros, setLibros]  = useState([]);
    const [editoriales, setEditoriales]  = useState([]);
    const [areas, setAreas]  = useState([]);

    const getLibros = async () => {
        try {
            
            const response = await fetch("http://localhost:3000/get_libros")
            const jsonData = await response.json();
            setLibros(jsonData);

        } catch (err) {
            console.log(err.message);
        }
    }

    const getAreas = async () => {
        try {
            
            const response = await fetch("http://localhost:3000/get_libros")
            const jsonData = await response.json();
            setLibros(jsonData);

        } catch (err) {
            console.log(err.message);
        }
    }

    const getEditoriales = async () => {
        try {
            
            const response = await fetch("http://localhost:3000/get_libros")
            const jsonData = await response.json();
            setLibros(jsonData);

        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getLibros();
        getEditoriales();
        getAreas();
    }, []);
    

    const [newLibro, setNewLibro] = useState({
        "id_libro" : "",
        "titulo" : "",
        "editorial": "",
        "area" : ""
    });

    const checkValues = () => {
        const err = new Map();
        if (newLibro["id_libro"] === "") {
            err.set('id_libro', 'Id no puede estar vacio.');
        }
        return err;
    }


    const handleChange = (key,e) => {
        let updateValue = {...newLibro};
        updateValue[key] = e.target.value;
        setNewLibro(updateValue);
        console.log(newLibro)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorAux = checkValues(); //falta terminar lo de checkValues
        setErrors(errorAux);

        if (errorAux.size === 0) {
            try {
                const body = { newLibro };
                const response = await fetch("http://localhost:3000/new_libro", {
                    method: "POST",
                    headers: { "Content-Type":"application/json"},
                    body: JSON.stringify(body)
                });
                
                if(response.status === 200){
                    setFetchSuccess(1);
                }else{
                    setFetchSuccess(2);
                }
                setTimeout(() => {
                    setFetchSuccess(0);
                }, 3000);
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        } else {
            setTimeout(() => {
                setErrors(undefined);
            }, 3000);
            console.log(errorAux);
        }
    }

    return (
        <div className='border-bottom border-1'>
            <h6 className='mt-3 fw-bold'>Añadir Libro: </h6>
            <form onSubmit={handleSubmit}>
                <div class="row mb-3 d-flex align-items-end">
                <div class="col-3">
                        <input type="text" class="form-control" placeholder="Titulo" aria-label="titulo" onChange={(e) => handleChange('titulo', e)}/>
                        {errors && errors.get('titulo') && <p className="settings-error-validate-message">{errors.get('titulo')} Intenta de nuevo</p>}
                    </div>
                    <div class="col-3">
                        <select class="form-select" aria-label="Default select example" onChange={(e) => handleChange('id_editorial', e)}>
                            <option disabled selected>Seleccione una editorial</option>
                            {editoriales.map(editorial => (
                                <option key={editorial.id_editorial} value = {editorial.id_editorial}>{editorial.nombre_editorial}</option>
                            ))}
                        </select>
                        {errors && errors.get('nombre_editorial') && <p className="settings-error-validate-message">{errors.get('nombre_editorial')} Intenta de nuevo</p>}
                    </div>
                    <div class="col-3">
                        <select class="form-select" aria-label="Default select example" onChange={(e) => handleChange('area', e)}>
                            <option disabled selected>Seleccione una area</option>
                            {editoriales.map(area => (
                                <option key={area.id_area} value = {area.id_area}>{area.descripcion_area}</option>
                            ))}
                        </select>
                        {errors && errors.get('descripcion_area') && <p className="settings-error-validate-message">{errors.get('descripcion_area')} Intenta de nuevo</p>}
                    </div>
                    <div class="col-2">
                        <button type="submit" class="btn btn-outline-primary">Añadir</button>
                    </div>
                </div>
            </form>

            {fetchSuccess===1 && <div class="alert alert-success" role="alert"> Se ha añadido correctamente la editorial. </div>}
            {fetchSuccess===2 && <div class="alert alert-danger" role="alert"> Ohh ha ocurrido un error, intenta de nuevo. </div>}
        </div>
    );
};

export default AddNewLibro;