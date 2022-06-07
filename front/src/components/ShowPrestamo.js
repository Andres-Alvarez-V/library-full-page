import React, { useState } from 'react';


const ShowPrestamo = () => {
    const [prestamos, setPrestamos] = useState([]);

    const deletePrestamos = async id => {
        try{
            console.log(id);
            const deletePrestamos = await fetch(`http://localhost:3000/delete_prestamo/${id}`, {
                method: 'DELETE'
            });
            setPrestamos(prestamos.filter(prestamo => prestamo.id_lector !== id));
        } catch(err){
            console.error(err.message);
        }
    };

    const getPrestamos = async () => {
        try {
            const response = await fetch("http://localhost:3000/show_prestamos");
            const jsonData = await response.json();
            setPrestamos(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <div className='border-bottom border-1'>
                <div className='d-flex justify-content-center'>
                    <button type="button" class="btn btn-outline-info my-3 me-3" onClick={getPrestamos}>Mostrar prestamos</button>
                    {prestamos.length !== 0 && 
                        <button type="button" class="btn btn-outline-danger my-3 mr-3" onClick={(e) => setPrestamos([])}>Ocultar prestamos</button>
                    }
                </div>
            </div>
            {prestamos.length !== 0 && 
                <div>
                    <table className='table mt-2 text-center'>
                        <thead>
                            <tr>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Titulo Libro</th>
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
                            {prestamos.map(prestamo => (
                                <tr key={prestamo.id_lector}>
                                    <td>{prestamo.ci}</td>
                                    <td>{prestamo.nombre}</td>
                                    <td>{prestamo.titulo}</td>
                                    <td>{prestamo.fecha_prestamo}</td>
                                    <td>{prestamo.fecha_devolucion}</td>
                                    <td>{prestamo.devuelto}</td>
                                    <td>{prestamo.multa}</td>
                                    <td>{prestamo.fecha_pago}</td>
                                    <td>{prestamo.valor_multa}</td>
                                    <th><button className='btn btn-warning'>Editar</button></th>
                                    <th><button className='btn btn-danger' 
                                    onClick={() => deletePrestamos(prestamo.id_lector)}>Eliminar</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
};
export default ShowPrestamo;