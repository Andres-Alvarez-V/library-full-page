import React, { useState } from 'react';


const SearchPrestamo = () => {
    const [prestamoo, setPrestamo] = useState([]);
    const [newPrestamo, setNewPrestamo] = useState({
        "fecha_prestamo" : ""
    });

    const [errors, setErrors] = useState(undefined);
    const checkValues = () => {
        const err = new Map();
        if (newPrestamo["fecha_prestamo"] === "") {
            err.set('fecha_prestamo', 'La fecha de prestamo no puede estar vacia.');
        }
        return err;
    }
    
    const deletePrestamo = async id => {
        try{
            console.log(id);
            const deletePrestamo = await fetch(`http://localhost:3000/delete_prestamo/${id}`, {
                method: 'DELETE'
            });
            setPrestamo({});
        } catch(err){
            console.error(err.message);
        }
    };
    
    const prestamo = newPrestamo["id_lector"];
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
                const showPrestamo = await fetch(`http://localhost:3000/show_prestamo/${prestamo}`, {
                    method: 'GET'
                });
                const jsonData = await showPrestamo.json();
                setPrestamo(jsonData[0]);
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
            <h2 className='text-center'>Prestamos</h2>
            <div className='border-bottom border-1'>
                <h6>Buscar Prestamo: </h6>
                <form onSubmit={handleSubmit}>
                    <div class="row mb-3">
                        <div class="col-3">
                            <input type="date" class="form-control" placeholder="Fecha del prestamo" aria-label="fecha_prestamo" onChange={(e) => handleChange('fecha_prestamo', e)}/>
                        </div>
                        <div class="col-2">
                            <button type="submit" class="btn btn-outline-primary">Buscar</button>
                        </div>
                    </div>
                </form>
            </div>
            {
                prestamoo.length !== 0 && 
                <div>
                <table className='table mt-2 text-center'>
                    <thead>
                        <tr>
                            <th>Id lector</th>
                            <th>Id libro</th>
                            <th>Fecha de prestamo</th>
                            <th>Fecha de devolucion</th>
                            <th>Devuelto</th>
                            <th>Multa</th>
                            <th>Fecha de pago</th>
                            <th>Valor multa</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr key={prestamoo["id_lector"]}>
                                <td>{prestamoo["id_lector"]}</td>
                                <td>{prestamoo["id_libro"]}</td>
                                <td>{prestamoo["fecha_prestamo"]}</td>
                                <td>{prestamoo["fecha_devolucion"]}</td>
                                <td>{prestamoo["devuelto"]}</td>
                                <td>{prestamoo["multa"]}</td>
                                <td>{prestamoo["fecha_pago"]}</td>
                                <td>{prestamoo["valor_multa"]}</td>
                                <th><button className='btn btn-warning'>Editar</button></th>
                                <th><button className='btn btn-danger' 
                                 onClick={() => deletePrestamo(prestamoo.prestamo)}>Eliminar</button></th>
                            </tr>
                    </tbody>
                </table>
            </div>
            }
        </>
    );
};

export default SearchPrestamo;