import React, { useState } from 'react';



const AddNewPrestamo= () => {

    const [errors, setErrors] = useState(undefined);
    const [fetchSuccess, setFetchSuccess] = useState(0);

    const [newPrestamo, setNewPrestamo] = useState({
        "id_lector" : "",   
        "id_libro": "",
        "fecha_prestamo" : "",
        "fecha_devolucion" : "",
        "devuelto": "",
        "multa": "",
        "fecha_pago" : "",
        "valor_multa": ""
    });

    const checkValues = () => {
        const err = new Map();
        if (newPrestamo["fecha_prestamo"] === "") {
            err.set('fecha_prestamo', 'Fecha de Prestamo no puede estar vacio.');
        }
        return err;
    }

    console.log(newPrestamo);    

    const handleChange = (key,e) => {
        let updateValue = {...newPrestamo};
        updateValue[key] = e.target.value;
        setNewPrestamo(updateValue);
     }

     const handleSubmit = async (e) => {
        e.preventDefault();
        const errorAux = checkValues();
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
            <h6 className='mt-3'>Añadir prestamo: </h6>
            <form onSubmit={handleSubmit}>
                <div class="row mb-3">
                    <div class="col-3">
                        <input type="text" class="form-control" placeholder="Id del lector" aria-label="id_lector" onChange={(e) => handleChange('id_lector', e)}/>
                        {errors && errors.get('id_lector') && <p className="settings-error-validate-message">{errors.get('id_lector')} Intenta de nuevo</p>}
                    </div>
                    <div class="col-3">
                        <input type="text" class="form-control" placeholder="Id del libro" aria-label="id_libro" onChange={(e) => handleChange('id_libro', e)}/>
                        {errors && errors.get('id_libro') && <p className="settings-error-validate-message">{errors.get('id_libro')} Intenta de nuevo</p>}
                    </div>
                    <div class="col-2">
                        <input type="date" class="form-control" placeholder="Fecha de prestamo" aria-label="fecha_prestamo" onChange={(e) => handleChange('fecha_prestamo', e)}/>
                    </div>
                    <div class="col-2">
                        <input type="date" class="form-control" placeholder="Fecha de devolución" aria-label="fecha_devolucion" onChange={(e) => handleChange('fecha_devolucion', e)}/>
                    </div>                    
                </div>
                <div className='row mb-3'>
                    <div className='col-1'>
                        <select class="form-select" aria-label="Default select example" onChange={(e) => handleChange('devuelto', e)}>
                                <option value="1" selected>Si</option>
                                <option value="0" >No</option>
                        </select>
                    </div>
                    <div className='col-1'>
                        <select class="form-select" aria-label="Default select example" onChange={(e) => handleChange('multa', e)}>
                                <option value="1" selected>Si</option>
                                <option value="0" >No</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <input type="date" class="form-control" placeholder="Fecha de pago" aria-label="fecha_pago" onChange={(e) => handleChange('fecha_pago', e)}/>
                        {errors && errors.get('fecha_pago') && <p className="settings-error-validate-message">{errors.get('fecha_pago')} Intenta de nuevo</p>}
                    </div>
                    <div class="col-2">
                        <input type="text" class="form-control" placeholder="Valor multa" aria-label="valor_multa" onChange={(e) => handleChange('valor_multa', e)}/>
                        {errors && errors.get('valor_multa') && <p className="settings-error-validate-message">{errors.get('valor_multa')} Intenta de nuevo</p>}
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