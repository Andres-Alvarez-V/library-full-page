import React, { useState } from "react";

const EditStudent = ({ infoStudent }) => {

    const [errors, setErrors] = useState(undefined);
    const [fetchSuccess, setFetchSuccess] = useState(0);

    const [newInfo, setNewInfo] = useState({
        "tipo_documento" : infoStudent.ci.substring(0, 2),
        "numero_documento" : infoStudent.ci.substring(3),
        "nombre_estudiante": infoStudent.nombre, 
        "direccion_estudiante":infoStudent.direccion,
        "carrera_estudiante": infoStudent.carrera.toString(),
        "edad_estudiante" : infoStudent.edad.toString()
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

    const closeModal = async (e) => {
        setNewInfo({
            "tipo_documento" : infoStudent.ci.substring(0, 2),
            "numero_documento" : infoStudent.ci.substring(3),
            "nombre_estudiante": infoStudent.nombre, 
            "direccion_estudiante":infoStudent.direccion,
            "carrera_estudiante": infoStudent.carrera.toString(),
            "edad_estudiante" : infoStudent.edad.toString()
        });
    }

     const updateDescription = async (e) => {
        e.preventDefault();
        const errorAux = checkValues();
        setErrors(errorAux);

        if (errorAux.size === 0) {
            try {
                const body = { newInfo };
                const response = await fetch(`http://localhost:3000/update_student/${infoStudent.id_lector}`, {
                    method: "PUT",
                    headers: { "Content-Type":"application/json"},
                    body: JSON.stringify(body)
                });
                
                if(response.status === 200){
                    window.location = "/estudiantes";
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




    console.log(infoStudent);
    console.log(newInfo)
    return (
        <>
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target= {`#idS${infoStudent.id_lector}`}>
                Editar
            </button>

            <div class="modal fade" id= {`idS${infoStudent.id_lector}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={() => closeModal()}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Editar estudiante</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal()}></button>
                    </div>


                    <div class="modal-body">
                            <div class="row mb-3">
                                <div class="col-3">
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => handleChange('tipo_documento', e)}>
                                        <option disabled selected>Elegir tipo documento</option>
                                        <option value="CC">CC</option>
                                        <option value="TI">TI</option>
                                        <option value="CE">CE</option>
                                    </select>
                                </div>
                                <div class="col-3">
                                    <input type="text" class="form-control" placeholder="Num Documento" aria-label="Num Documento" onChange={(e) => handleChange('numero_documento', e)} value = {newInfo.numero_documento}/>
                                    {errors && errors.get('numero_documento') && <p className="settings-error-validate-message">{errors.get('numero_documento')} Intenta de nuevo</p>}
                                </div>
                                <div class="col-3">
                                    <input type="text" class="form-control" placeholder="Nombre" aria-label="Nombre" onChange={(e) => handleChange('nombre_estudiante', e)} value = {newInfo.nombre_estudiante}/>
                                    {errors && errors.get('nombre_estudiante') && <p className="settings-error-validate-message">{errors.get('nombre_estudiante')} Intenta de nuevo</p>}
                                </div>
                               
                                
                            </div>
                            <div className='row mb-3'>
                                <div class="col-3">
                                    <input type="text" class="form-control" placeholder="Direccion" aria-label="Direccion" onChange={(e) => handleChange('direccion_estudiante', e)} value = {newInfo.direccion_estudiante}/>
                                </div>
                                <div className='col-3'>
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => handleChange('carrera__estudiante', e)}>
                                            <option disabled selected>Elegir carrera</option>
                                            <option value="1">Biologia</option>
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
                                    <input type="text" class="form-control" placeholder="Edad" aria-label="Edad" onChange={(e) => handleChange('edad_estudiante', e)} value = {newInfo.edad_estudiante}/>
                                    {errors && errors.get('edad_estudiante') && <p className="settings-error-validate-message">{errors.get('edad_estudiante')} Intenta de nuevo</p>}
                                </div>
                            </div>

                        {/* {fetchSuccess===1 && <div class="alert alert-success" role="alert"> Se ha añadido correctamente el estudiante. </div>} */}
                        {fetchSuccess===2 && <div class="alert alert-danger" role="alert"> Ohh ha ocurrido un error, intenta de nuevo. </div>}
                    </div>


                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => closeModal()}>Cerrar</button>
                        <button type="button" class="btn btn-warning" onClick={(e) => updateDescription(e)}>Guardar</button>
                    </div>

                </div>
            </div>
            </div>
        </>
    )
};

export default EditStudent;