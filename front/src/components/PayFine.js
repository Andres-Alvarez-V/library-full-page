import React, { useState } from "react";

const PayFine = ({ infoPrestamo, getPrestamosMultados }) => {


    const [newValue, setNewValue] = useState(infoPrestamo);

    const closeModal = async (e) => {
        getPrestamosMultados();
    }

     const updateFineValue = async (e) => {
        
        try {
                const body = { newValue };
                console.log(body)
                const response = await fetch(`http://localhost:3000/pagar_multa`, {
                    method: "PUT",
                    headers: { "Content-Type":"application/json"},
                    body: JSON.stringify(body)
                });

                if(response.status === 200){
                    // window.location = "/prestamos";
                }
        } catch (err) {
            console.log(err.message);
        }

        
    }


    return (
        <>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target= {`#idP${infoPrestamo.id_lector}${infoPrestamo.id_libro}`}>
                Pagar
            </button>

            <div class="modal fade" id= {`idP${infoPrestamo.id_lector}${infoPrestamo.id_libro}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ingresa el valor a pagar</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal()}></button>
                        </div>


                        <div class="modal-body">
                            <input type="text" class="form-control" placeholder="Valor de multa" aria-label="Valor de multa" onChange={(e) => newValue["valor_multa"] = e.target.value}/>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => closeModal()}>Cerrar</button>
                            <button type="button" class="btn btn-success" onClick={(e) => updateFineValue(e)}>Confirmar Pago</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};

export default PayFine;