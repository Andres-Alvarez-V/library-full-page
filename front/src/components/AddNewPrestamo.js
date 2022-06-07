import React, { useState, useEffect } from 'react';



const AddNewPrestamo= () => {

    const [errors, setErrors] = useState(undefined);
    const [fetchSuccess, setFetchSuccess] = useState(0);
    const [libros, setLibros]  = useState([]);

    const getLibros = async () => {
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
    }, []);
    

    const [newPrestamo, setNewPrestamo] = useState({
        "tipo_documento" : "",
        "numero_documento" : "",
        "id_libro": "",
        "fecha_prestamo" : "",
        "fecha_devolucion" : ""
    });

    const checkValues = () => {
        const err = new Map();
        if (newPrestamo["fecha_prestamo"] === "") {
            err.set('fecha_prestamo', 'Fecha de Prestamo no puede estar vacio.');
        }
        return err;
    }


    const handleChange = (key,e) => {
        let updateValue = {...newPrestamo};
        updateValue[key] = e.target.value;
        setNewPrestamo(updateValue);
        console.log(newPrestamo)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorAux = checkValues(); //falta terminar lo de checkValues
        setErrors(errorAux);

        if (errorAux.size === 0) {
            try {
                const body = { newPrestamo };
                const response = await fetch("http://localhost:3000/new_prestamo", {
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
            <h6 className='mt-3 fw-bold'>Añadir prestamo: </h6>
            <form onSubmit={handleSubmit}>
                <div class="row mb-3 d-flex align-items-end">
                    <div class="col-3">
                        <select class="form-select" aria-label="Default select example" onChange={(e) => handleChange('tipo_documento', e)}>
                            <option selected disabled>Tipo de documento</option>
                            <option value="CC">CC</option>
                            <option value="TI">TI</option>
                            <option value="CE">CE</option>
                        </select>
                    </div>
                    <div class="col-3">
                        <input type="text" class="form-control" placeholder="Num Documento" aria-label="Num Documento" onChange={(e) => handleChange('numero_documento', e)}/>
                        {errors && errors.get('numero_documento') && <p className="settings-error-validate-message">{errors.get('numero_documento')} Intenta de nuevo</p>}
                    </div>
                    <div class="col-3">
                        <select class="form-select" aria-label="Default select example" onChange={(e) => handleChange('id_libro', e)}>
                            <option disabled selected>Seleccione un libro</option>
                            {libros.map(libro => (
                                <option key={libro.id_libro} value = {libro.id_libro}>{libro.titulo}</option>
                            ))}
                        </select>
                        {errors && errors.get('id_libro') && <p className="settings-error-validate-message">{errors.get('id_libro')} Intenta de nuevo</p>}
                    </div>
                </div>
                <div className='row mb-3 d-flex align-items-end'>
                    <div class="col-2">
                        <p className='mb-1'>Fecha del prestamo: </p>
                        <input type="date" class="form-control" placeholder="Fecha de prestamo" aria-label="fecha_prestamo" onChange={(e) => handleChange('fecha_prestamo', e)}/>
                    </div>
                    <div class="col-2">
                        <p className='mb-1'>Fecha de devolución: </p>
                        <input type="date" class="form-control" placeholder="Fecha de devolución" aria-label="fecha_devolucion" onChange={(e) => handleChange('fecha_devolucion', e)}/>
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

export default AddNewPrestamo;