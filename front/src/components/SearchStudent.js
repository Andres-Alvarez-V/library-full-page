import React, { useState } from 'react';


const SearchStudent = () => {

    
    return (
        <>
            <h2 className='text-center'>Estudiantes</h2>
            <div className='border-bottom border-1'>
                <h6>Buscar estudiante: </h6>
                <form>
                    <div class="row mb-3">
                        <div class="col-1">
                            <select class="form-select" aria-label="Default select example">
                                <option value="1" selected>CC</option>
                                <option value="2">TI</option>
                            </select>
                        </div>
                        <div class="col-3">
                            <input type="text" class="form-control" placeholder="Num Documento" aria-label="Num Documento"/>
                        </div>
                        <div class="col-2">
                            <button type="submit" class="btn btn-outline-primary">Buscar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SearchStudent;