import React, { useState } from 'react';


const ShowLibro = () => {
    const [libros, setLibros] = useState([]);
    const [totalMulta, setTotalMulta] = useState({
        "multa" : ""
    });


    const deleteLibros = async id => {
        try{
            console.log(id);
            const deleteLibros = await fetch(`http://localhost:3000/delete_libro/${id}`, {
                method: 'DELETE'
            });
            setLibros(libros.filter(libro => libro.id_libro !== id));
        } catch(err){
            console.error(err.message);
        }
    };

    const getLibros = async () => {
        try {
            const response = await fetch("http://localhost:3000/show_libros");
            const jsonData = await response.json();
            setLibros(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const getMultas = async () => {
        try {
            const response = await fetch("http://localhost:3000/total_multas");
            const jsonData = await response.json();
            setTotalMulta(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const closeModal = async (e) => {}


    return (
        <>
            <div className='border-bottom border-1'>
                <div className='d-flex justify-content-center'>
                    <button type="button" class="btn btn-outline-info my-3 me-3" onClick={getLibros}>Mostrar libros</button>
                    <button type="button" class="btn btn-outline-info my-3 me-3" onClick={getMultas}>Mostrar total de multas</button>                   
                    {libros.length !== 0 && 
                    <button type="button" class="btn btn-outline-danger my-3 mr-3" onClick={(e) => setLibros([])}>Ocultar libros</button>
                    }
                </div>
            </div>
            {libros.length !== 0 && 
                <div>
                    <table className='table mt-2 text-center'>
                        <thead>
                            <tr>
                            <th>Titulo</th>
                            <th>Editorial</th>
                            <th>Area</th>
                            <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {libros.map(libro => (
                                <tr key={libro.id_libro}>
                                    <td>{libro.titulo}</td>
                                    <td>{libro.nombre_editorial}</td>
                                    <td>{libro.descripcion_area}</td>
                                    <th><button className='btn btn-danger' 
                                    onClick={() => deleteLibros(libro.id_libro)}>Eliminar</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {totalMulta.length !== 0 && 
            <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-personalize ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Total de multas:</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal()}></button>
                    </div>
                    <div class="modal-body"> 
                            </div>
                            <div className='row mb-3'>
                                <div class="col-3">
                                <textarea>{getMultas}</textarea>
                                </div>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => closeModal()}>Cerrar</button>
                    </div>

                </div>
            </div>
            }
        </>
    );
};
export default ShowLibro;