import React, { useState } from "react";

const EditEditorial = ({ infoEditorial }) => {

    const [errors, setErrors] = useState(undefined);
    const [fetchSuccess, setFetchSuccess] = useState(0);

    const [newEdit, setNewEdit] = useState({
        "nombre_editorial": infoEditorial.nombre_editorial, 
        "telefono" : infoEditorial.telefono
    });

    const checkValues = () => {
        const err = new Map();
        if (newEdit["nombre_editorial"] === "") {
            err.set('nombre_editorial', 'Nombre no puede estar vacio.');
        }
        return err;
    }

    const handleChange = (key,e) => {
        let updateValue = {...newEdit};
        updateValue[key] = e.target.value;
        setNewEdit(updateValue);
        console.log(newEdit)
    }

    const closeModal = async (e) => {
        setNewEdit({
            "nombre_editorial": infoEditorial.nombre_editorial, 
            "telefono" : infoEditorial.telefono
        });
    }

     const updateDescription = async (e) => {
        e.preventDefault();
        const errorAux = checkValues();
        setErrors(errorAux);

        if (errorAux.size === 0) {
            try {
                const body = { newEdit };
                const response = await fetch(`http://localhost:3000/update_editorial/${infoEditorial.id_editorial}`, {
                    method: "PUT",
                    headers: { "Content-Type":"application/json"},
                    body: JSON.stringify(body)
                });
                
                if(response.status === 200){
                    window.location = "/editoriales";
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
        <>
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target= {`#idS${infoEditorial.id_editorial}`}>
                Editar
            </button>

            <div class="modal fade" id= {`idS${infoEditorial.id_editorial}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-personalize ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Editar editorial</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal()}></button>
                        </div>


                        <div class="modal-body">
                                <div class="row mb-3">
                                    <div class="col-3">
                                        <input type="text" class="form-control" placeholder="Nombre editorial" aria-label="Nombre editorial" onChange={(e) => handleChange('nombre_editorial', e)} value = {newEdit.nombre_editorial}/>
                                        {errors && errors.get('nombre_editorial') && <p className="settings-error-validate-message">{errors.get('nombre_editorial')} Intenta de nuevo</p>}
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" placeholder="Telefono" aria-label="Telefono" onChange={(e) => handleChange('telefono', e)} value = {newEdit.telefono}/>
                                        {errors && errors.get('telefono') && <p className="settings-error-validate-message">{errors.get('telefono')} Intenta de nuevo</p>}
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

export default EditEditorial;