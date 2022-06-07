import React, { useState } from 'react';



const AddNewStudent = () => {

    const [errors, setErrors] = useState(undefined);
    const [fetchSuccess, setFetchSuccess] = useState(0);

    const [newInfo, setNewInfo] = useState({
        "tipo_documento" : "CC",
        "numero_documento" : "",
        "nombre_estudiante": "", 
        "direccion_estudiante":"",
        "carrera_estudiante":"1",
        "edad_estudiante" : ""
    });

    const checkValues = () => {
        const err = new Map();
        if (newInfo["numero_documento"] === "") {
            err.set('numero_documento', 'Num Documento no puede estar vacio.');
        }
        if (newInfo["nombre_estudiante"] === "") {
            err.set('nombre_estudiante', 'Nombre no puede estar vacio.');
        }
        if (newInfo["edad_estudiante"] === "") {
            err.set('edad_estudiante', 'Edad no puede estar vacio.');
        }

        return err;
    }

    // console.log(newInfo);
    // console.log(newInfo["tipo_documento"]+newInfo["numero_documento"])
    

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
                const body = { newInfo };
                const response = await fetch("http://localhost:3000/new_student", {
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
            <h6 className='mt-3 fw-bold'>Añadir nuevo estudiante: </h6>
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
                        {errors && errors.get('numero_documento') && <p className="settings-error-validate-message">{errors.get('numero_documento')} Intenta de nuevo</p>}
                    </div>
                    <div class="col-3">
                        <input type="text" class="form-control" placeholder="Nombre" aria-label="Nombre" onChange={(e) => handleChange('nombre_estudiante', e)}/>
                        {errors && errors.get('nombre_estudiante') && <p className="settings-error-validate-message">{errors.get('nombre_estudiante')} Intenta de nuevo</p>}
                    </div>
                    <div class="col-3">
                        <input type="text" class="form-control" placeholder="Direccion" aria-label="Direccion" onChange={(e) => handleChange('direccion_estudiante', e)}/>
                    </div>
                    
                </div>
                <div className='row mb-3'>
                    <div className='col-3'>
                        <select class="form-select" aria-label="Default select example" onChange={(e) => handleChange('carrera_estudiante', e)}>
                                <option value="1" selected>Biologia</option>
                                <option value="2">Economia</option>
                                <option value="3">Administracion</option>
                                <option value="4">Negocios Internacionales</option>
                                <option value="5">Fisica</option>
                                <option value="6">Ing Matematica</option>
                                <option value="7">Ing de sistemas</option>
                                <option value="8">Ing de produccion</option>
                                <option value="9">Ing industrial</option>
                                <option value="10">Medicina</option>
                                <option value="11">Derecho</option>
                                <option value="12">Ciencias Politicas</option>
                                <option value="13">Literatura</option>
                                <option value="14">Musica</option>
                                <option value="15">Psicologia</option>
                                <option value="16">Ing Civil</option>
                                <option value="17">Arquitectura</option>
                        </select>
                    </div>
                    <div class="col-3">
                        <input type="text" class="form-control" placeholder="Edad" aria-label="Edad" onChange={(e) => handleChange('edad_estudiante', e)}/>
                        {errors && errors.get('edad_estudiante') && <p className="settings-error-validate-message">{errors.get('edad_estudiante')} Intenta de nuevo</p>}
                    </div>
                    <div class="col-2">
                        <button type="submit" class="btn btn-outline-primary">Añadir</button>
                    </div>
                </div>
            </form>

            {fetchSuccess===1 && <div class="alert alert-success" role="alert"> Se ha añadido correctamente el estudiante. </div>}
            {fetchSuccess===2 && <div class="alert alert-danger" role="alert"> Ohh ha ocurrido un error, intenta de nuevo. </div>}
        </div>
    );
};

export default AddNewStudent;
