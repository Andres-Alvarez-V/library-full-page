import React, { useState } from 'react';
import PayFine from './PayFine'

const ShowPrestamo = () => {
    const [prestamosActivosSinMulta, setPrestamosActivosSinMulta] = useState([]);//multa = 0 - devuelto = 0
    const [prestamosActivosMultados, setPrestamosActivosMultados] = useState([]);//multa = 1 - devuelto = 0
    const [prestamosPagados, setPrestamosPagados] = useState([]); //multa = 1 - devuelto = 1
    const [prestamosDevueltos, setPrestamosDevueltos] = useState([]); //multa = 0 - devuelto = 1

    const deletePrestamos = async id => {
        try{
            console.log(id);
            const deletePrestamos = await fetch(`http://localhost:3000/delete_prestamo/${id}`, {
                method: 'DELETE'
            });
            setPrestamosActivosSinMulta(prestamosActivosSinMulta.filter(prestamo => prestamo.id_lector !== id));
        } catch(err){
            console.error(err.message);
        }
    };

    const getPrestamosMultados = async () => {  
        ocultarPrestamos();
        try {
            const response = await fetch("http://localhost:3000/show_prestamos_multados");
            console.log(response)
            const jsonData = await response.json();
            console.log(jsonData);
            setPrestamosActivosMultados(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const getPrestamosSinMultar = async () => {
        ocultarPrestamos();
        try {
            const response = await fetch("http://localhost:3000/show_prestamos_sin_multar");
            const jsonData = await response.json();
            setPrestamosActivosSinMulta(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const getPrestamosPagados = async () => {  
        ocultarPrestamos();
        try {
            const response = await fetch("http://localhost:3000/show_prestamos_pagados");
            console.log(response)
            const jsonData = await response.json();
            console.log(jsonData);
            setPrestamosPagados(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const getPrestamosDevueltos = async () => {  
        ocultarPrestamos();
        try {
            const response = await fetch("http://localhost:3000/show_prestamos_devueltos");
            console.log(response)
            const jsonData = await response.json();
            console.log(jsonData);
            setPrestamosDevueltos(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const ocultarPrestamos = () => {
        setPrestamosActivosSinMulta([]);   
        setPrestamosActivosMultados([]);
        setPrestamosPagados([]);
        setPrestamosDevueltos([]);
    }

    const multarPrestamo = async (id_lector, id_libro, fecha_prestamo) => {
        const response = await fetch(`http://localhost:3000/multar_prestamo/${id_lector}/${id_libro}/${fecha_prestamo}`, {
            method: "PUT",
            headers: { "Content-Type":"application/json"},
        });
        getPrestamosSinMultar();
    }

    const devolverPrestamo = async (id_lector, id_libro, fecha_prestamo) => {
        const response = await fetch(`http://localhost:3000/devolver_prestamo/${id_lector}/${id_libro}/${fecha_prestamo}`, {
            method: "PUT",
            headers: { "Content-Type":"application/json"},
        });
        getPrestamosSinMultar();
    }

    return (
        <>
            <div className='border-bottom border-1'>
                <div className='d-flex justify-content-center'>
                    <button type="button" class="btn btn-outline-info my-3 me-3" onClick={getPrestamosMultados}>Mostrar prestamos activos con multas</button>
                    <button type="button" class="btn btn-outline-info my-3 me-3" onClick={getPrestamosSinMultar}>Mostrar prestamos activos</button>
                    <button type="button" class="btn btn-outline-info my-3 me-3" onClick={getPrestamosPagados}>Mostrar prestamos con multas pagadas</button>
                    <button type="button" class="btn btn-outline-info my-3 me-3" onClick={getPrestamosDevueltos}>Mostrar prestamos devueltos sin multas</button>
                    {(prestamosActivosSinMulta.length !== 0 || prestamosActivosMultados.length !== 0 || prestamosPagados.length !== 0 || prestamosDevueltos.length !== 0 ) &&
                        <button type="button" class="btn btn-outline-danger my-3 mr-3" onClick={(e) => ocultarPrestamos()}>Ocultar prestamos</button>
                    }
                </div>
            </div>
            {prestamosActivosSinMulta.length !== 0 && 
                <div>
                    <table className='table mt-2 text-center'>
                        <thead>
                            <tr>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Titulo Libro</th>
                            <th>Fecha de prestamo</th>
                            <th>Fecha de devolucion</th>
                            <th>Devolver</th>
                            <th>Multar</th>
                            <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prestamosActivosSinMulta.map(prestamo => (
                                <tr key={prestamo.id_lector}>
                                    <td>{prestamo.ci}</td>
                                    <td>{prestamo.nombre}</td>
                                    <td>{prestamo.titulo}</td>
                                    <td>{prestamo.fecha_prestamo}</td>
                                    <td>{prestamo.fecha_devolucion}</td>
                                    <th><button className='btn btn-success' onClick={() => devolverPrestamo(prestamo.id_lector, prestamo.id_libro, prestamo.fecha_prestamo)}>Devolver</button></th>
                                    <th><button className='btn btn-warning' onClick= { () => multarPrestamo(prestamo.id_lector, prestamo.id_libro, prestamo.fecha_prestamo)}>Multar</button></th>
                                    <th><button className='btn btn-danger' onClick={() => deletePrestamos(prestamo.id_lector)}>Eliminar</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {prestamosActivosMultados.length !== 0 && 
                <div>
                    <table className='table mt-2 text-center'>
                        <thead>
                            <tr>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Titulo Libro</th>
                            <th>Fecha de prestamo</th>
                            <th>Fecha de devolucion</th>
                            <th>Pagar</th>
                            <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prestamosActivosMultados.map(prestamo => (
                                <tr key={`${prestamo.id_lector}${prestamo.id_libro}${prestamo.fecha_prestamo}`}>
                                    <td>{prestamo.ci}</td>
                                    <td>{prestamo.nombre}</td>
                                    <td>{prestamo.titulo}</td>
                                    <td>{prestamo.fecha_prestamo}</td>
                                    <td>{prestamo.fecha_devolucion}</td>
                                    <th><PayFine infoPrestamo = {prestamo} getPrestamosMultados = {getPrestamosMultados} /></th>
                                    <th><button className='btn btn-danger' onClick={() => deletePrestamos(prestamo.id_lector)}>Eliminar</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            
            {prestamosDevueltos.length !== 0 && 
                <div>
                    <table className='table mt-2 text-center'>
                        <thead>
                            <tr>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Titulo Libro</th>
                            <th>Fecha de prestamo</th>
                            <th>Fecha de devolucion</th>
                            <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prestamosDevueltos.map(prestamo => (
                                <tr key={prestamo.id_lector}>
                                    <td>{prestamo.ci}</td>
                                    <td>{prestamo.nombre}</td>
                                    <td>{prestamo.titulo}</td>
                                    <td>{prestamo.fecha_prestamo}</td>
                                    <td>{prestamo.fecha_devolucion}</td>
                                    <th><button className='btn btn-danger' onClick={() => deletePrestamos(prestamo.id_lector)}>Eliminar</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            
            {prestamosPagados.length !== 0 && 
                <div>
                    <table className='table mt-2 text-center'>
                        <thead>
                            <tr>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Titulo Libro</th>
                            <th>Fecha de prestamo</th>
                            <th>Fecha de devolucion</th>
                            <th>Fecha de pago</th>
                            <th>Valor multa</th>
                            <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prestamosPagados.map(prestamo => (
                                <tr key={prestamo.id_lector}>
                                    <td>{prestamo.ci}</td>
                                    <td>{prestamo.nombre}</td>
                                    <td>{prestamo.titulo}</td>
                                    <td>{prestamo.fecha_prestamo}</td>
                                    <td>{prestamo.fecha_devolucion}</td>
                                    <td>{prestamo.fecha_pago}</td>
                                    <td>{prestamo.valor_multa}</td>
                                    <th><button className='btn btn-danger' onClick={() => deletePrestamos(prestamo.id_lector)}>Eliminar</button></th>
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