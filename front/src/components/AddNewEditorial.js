import React, { useState } from 'react';



const AddNewEditorial= () => {

    const [errors, setErrors] = useState(undefined);
    const [fetchSuccess, setFetchSuccess] = useState(0);

    const [newEdit, setNewEdit] = useState({
        "nombre_editorial" : "",
        "telefono":""
    });

    const checkValues = () => {
        const err = new Map();
        if (newEdit["nombre_editorial"] === "") {
            err.set('nombre_editorial', 'Nombre no puede estar vacio.');
        }
        return err;
    }

    console.log(newEdit);    

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
                const body = { newEdit };
                const response = await fetch("http://localhost:3000/new_editorial", {
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
            <h6 className='mt-3'>Añadir nueva editorial: </h6>
            <form onSubmit={handleSubmit}>
                <div class="row mb-3">
                    <div class="col-3">
                        <input type="text" class="form-control" placeholder="Nombre Editorial" aria-label="Nombre Editorial" onChange={(e) => handleChange('nombre_editorial', e)}/>
                        {errors && errors.get('nombre_editorial') && <p className="settings-error-validate-message">{errors.get('nombre_editorial')} Intenta de nuevo</p>}
                    </div>
                    <div class="col-3">
                        <input type="text" class="form-control" placeholder="Telefono" aria-label="Telefono" onChange={(e) => handleChange('telefono', e)}/>
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

export default AddNewEditorial;