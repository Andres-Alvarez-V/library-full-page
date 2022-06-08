const express = require("express");
const app  =  express();
const cors = require("cors");
const pool = require("./db");
const { json } = require("express");
//middleware
app.use(cors());
app.use(express.json());
//ROUTES//

//Estudiante
app.post("/new_student", async(req, res) => {
    try {
        console.log(req.body)
        const { tipo_documento, numero_documento, nombre_estudiante, direccion_estudiante, carrera_estudiante, edad_estudiante } = req.body.newInfo;
        let CI = tipo_documento + "-" + numero_documento;
        let carrera = parseInt(carrera_estudiante);
        let edad = parseInt(edad_estudiante);
        console.log(carrera);
        const newStudent = await pool.query("INSERT INTO estudiante (ci, nombre, direccion, carrera, edad) VALUES($1, $2, $3, $4, $5) RETURNING *", [CI, nombre_estudiante, direccion_estudiante, carrera, edad]);
        res.json(newStudent);
    } catch (err) { 
        res.status(900).send("Hubo un error al ejecutar la peticion");
        console.log(err.message);
    }
});

//mostrar estudiantes
app.get("/show_students/", async(req, res) => {
    try {
        const allStudents = await pool.query("SELECT estudiante.*,  carrera.nombre_programa FROM estudiante, carrera WHERE estudiante.carrera = carrera.carrera");
        res.json(allStudents.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//Buscar estudiante
app.get("/show_student/:ci", async(req, res) => {
    try {
        const { ci } = req.params;
        const student = await pool.query("SELECT estudiante.*,  carrera.nombre_programa FROM estudiante, carrera WHERE estudiante.carrera = carrera.carrera and estudiante.ci = $1", [ci]);
        res.json(student.rows);
        console.log(student.rows)
    } catch (err) {
        console.log(err.message);
    }
});

//editar estudiante
app.put("/update_student/:id_lector", async(req, res) => {
    try {
        const { id_lector } =  req.params;
        console.log(req.body)
        const { tipo_documento, numero_documento, nombre_estudiante, direccion_estudiante, carrera_estudiante, edad_estudiante } = req.body.newInfo;
        let CI = tipo_documento + "-" + numero_documento;
        let carrera = parseInt(carrera_estudiante);
        let edad = parseInt(edad_estudiante);
        const updateStudent = await pool.query("UPDATE estudiante SET ci = $1, nombre = $2, direccion = $3, carrera = $4, edad = $5 WHERE id_lector = $6", [CI, nombre_estudiante, direccion_estudiante, carrera, edad, id_lector]);
        res.json("Update complete");
    } catch (err) {
        console.log(err.message);
    }
});

// delete
app.delete("/delete_student/:id_lector", async(req, res) => {
    try {
        const deleteStudents = await pool.query("DELETE FROM estudiante WHERE id_lector = $1", [req.params["id_lector"]]);
        res.json("Delete complete");
    } catch (err) {
        console.log(err.message);
    }
});

//-------------------------------------------------------------------------------------

//Editorial
app.post("/new_editorial", async(req, res) => {
    try {
        console.log(req.body)
        const {nombre_editorial, telefono} = req.body.newEdit;
        let tel = parseInt(telefono);
        console.log(nombre_editorial);
        console.log(telefono)
        const newEdit = await pool.query("INSERT INTO editorial (nombre_editorial, telefono) VALUES($1, $2) RETURNING *", [nombre_editorial, tel]);
        res.json(newEdit);
    } catch (err) { 
        res.status(900).send("Hubo un error al ejecutar la peticion");
        console.log(err.message);
    }
});

//get
app.get("/show_editorial/", async(req, res) => {
    try {
        const allEdits = await pool.query("SELECT * FROM editorial");
        res.json(allEdits.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//Buscar editorial
app.get("/show_editorial/:nombre_editorial", async(req, res) => {
    try {
        const edit = await pool.query("select * from editorial where nombre_editorial  = $1 ", [req.params["nombre_editorial"]]);
        res.json(edit.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// delete
app.delete("/delete_editorial/:id_editorial", async(req, res) => {
    try {
        const deleteEditorial = await pool.query("DELETE FROM editorial WHERE id_editorial = $1", [req.params["id_editorial"]]);
        res.json("Delete complete");
    } catch (err) {
        console.log(err.message);
    }
});

//editar editorial
app.put("/update_editorial/:id_editorial", async(req, res) => {
    try {
        const { id_editorial } =  req.params;
        console.log(req.body)
        const { nombre_editorial, telefono} = req.body.newEdit;
        let tele = parseInt(telefono);
        const updateEditorial = await pool.query("UPDATE editorial SET nombre_editorial = $1, telefono = $2 WHERE id_editorial = $3", [nombre_editorial, tele, id_editorial]);
        res.json("Update complete");
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/get_editoriales", async(req, res) => {
    try {
        const editoriales = await pool.query("SELECT * FROM editorial");
        res.json(editoriales.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------

//Prestamo
//create
app.post("/new_prestamo", async(req, res) => {
    try {
        console.log(req.body)
        const { tipo_documento, numero_documento, id_libro, fecha_prestamo, fecha_devolucion} = req.body.newPrestamo;
        let CI = tipo_documento + "-" + numero_documento;
        const newPrestamo = await pool.query("INSERT INTO prestamo (id_lector, id_libro, fecha_prestamo, fecha_devolucion, multa, devuelto, valor_multa) VALUES((select id_lector from estudiante where ci = $1), $2, $3, $4, $5, $6, $7 ) RETURNING *", [CI, id_libro, fecha_prestamo, fecha_devolucion, '0', '0', 0]);
        res.json(newPrestamo);
    } catch (err) { 
        res.status(900).send("Hubo un error al ejecutar la peticion");
        console.log(err.message);
    }
});

//gets
app.get("/show_prestamos_sin_multar", async(req, res) => {
    try {
        const allPrestamo = await pool.query("SELECT  est.ci, est.nombre, lb.titulo, pre.* FROM prestamo as pre, estudiante as est, libro as lb WHERE pre.id_lector = est.id_lector and lb.id_libro = pre.id_libro and pre.devuelto = '0' and pre.multa = '0'");
        res.json(allPrestamo.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/show_prestamos_multados", async(req, res) => {
    try {
        const allPrestamo = await pool.query("SELECT  est.ci, est.nombre, lb.titulo, pre.* FROM prestamo as pre, estudiante as est, libro as lb WHERE pre.id_lector = est.id_lector and lb.id_libro = pre.id_libro and pre.devuelto = '0' and pre.multa = '1'");
        res.json(allPrestamo.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/show_prestamos_pagados", async(req, res) => {
    try {
        const allPrestamo = await pool.query("SELECT  est.ci, est.nombre, lb.titulo, pre.* FROM prestamo as pre, estudiante as est, libro as lb WHERE pre.id_lector = est.id_lector and lb.id_libro = pre.id_libro and pre.devuelto = '1' and pre.multa = '1'");
        res.json(allPrestamo.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/show_prestamos_devueltos", async(req, res) => {
    try {
        const allPrestamo = await pool.query("SELECT  est.ci, est.nombre, lb.titulo, pre.* FROM prestamo as pre, estudiante as est, libro as lb WHERE pre.id_lector = est.id_lector and lb.id_libro = pre.id_libro and pre.devuelto = '1' and pre.multa = '0'");
        res.json(allPrestamo.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//Buscar prestamo
app.get("/show_prestamo/:titulo", async(req, res) => {
    try {
        const prestamoo = await pool.query("SELECT prestamo.*,  libro.titulo, estudiante.ci, estudiante.nombre FROM prestamo, libro, estudiante WHERE prestamo.id_libro = libro.id_libro and prestamo.id_lector = estudiante.id_lector");
        res.json(prestamoo.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// delete
app.delete("/delete_prestamo/:id_lector", async(req, res) => {
    try {
        const deletePrestamo = await pool.query("DELETE FROM prestamo WHERE id_lector = $1", [req.params["id_lector"]]);
        res.json("Delete complete");
    } catch (err) {
        console.log(err.message);
    }
});

//multar prestamo
app.put("/multar_prestamo/:id_lector/:id_libro/:fecha_prestamo", async(req, res) => {
    try {
        
        const { id_lector, id_libro, fecha_prestamo } = req.params;
        console.log(req.params)
        console.log(id_lector)
        console.log(id_libro)
        console.log(fecha_prestamo)
        const multarPrestamo = await pool.query("UPDATE prestamo SET multa = '1' WHERE id_lector = $1 and id_libro = $2 and fecha_prestamo = $3", [id_lector, id_libro, fecha_prestamo]);
        res.json("Se ha multado correctamente");

    } catch (err) {
        console.log(err.message)
    }
});

//devolver prestamo
app.put("/devolver_prestamo/:id_lector/:id_libro/:fecha_prestamo", async(req, res) => {
    try {
        const { id_lector, id_libro, fecha_prestamo } = req.params;
        console.log(req.params)
        console.log(id_lector)
        console.log(id_libro)
        console.log(fecha_prestamo)
        const multarPrestamo = await pool.query("UPDATE prestamo SET devuelto = '1' WHERE id_lector = $1 and id_libro = $2 and fecha_prestamo = $3", [id_lector, id_libro, fecha_prestamo]);
        res.json("Se ha devuelto correctamente");
    } catch (err) {
        console.log(err.message)
    }
});

//pagar multa
app.put("/pagar_multa", async (req, res) => {
    try {
        console.log(req.body)
        const { id_lector, id_libro, fecha_prestamo, fecha_pago, valor_multa } = req.body.newValue
        const pagarMulta = await pool.query("UPDATE prestamo SET devuelto = '1', valor_multa = $1, fecha_pago = $2 WHERE id_lector = $3 and id_libro = $4 and fecha_prestamo = $5", [valor_multa, fecha_pago, id_lector, id_libro, fecha_prestamo]);
        res.json("Se ha pagado correctamente la multa");
    } catch (err) {
        console.log(err.message)
    }
})


//-------------------------------------------
//Libros

app.get("/get_libros", async(req, res) => {
    try {
        const libros = await pool.query("SELECT * FROM libro");
        res.json(libros.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.post("/new_libro", async(req, res) => {
    try {
        console.log(req.body)
        const {titulo, id_editorial, id_area} = req.body.newLibro;
        console.log(titulo);
        console.log(id_editorial)
        console.log(id_area)
        const newLibro = await pool.query("INSERT INTO libro(titulo, id_editorial, id_area) VALUES($1, $2, $3) RETURNING *", [titulo, id_editorial, id_area]);
        res.json(newLibro);
    } catch (err) { 
        res.status(900).send("Hubo un error al ejecutar la peticion");
        console.log(err.message);
    }
});

//get
app.get("/show_libros/", async(req, res) => {
    try {
        const allLibros = await pool.query("SELECT libro.*,  editorial.nombre_editorial, area.descripcion_area FROM libro, editorial, area WHERE libro.id_editorial = editorial.id_editorial and libro.id_area = area.id_area");
        res.json(allLibros.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//Buscar libro
app.get("/show_libro/:titulo", async(req, res) => {
    try {
        
        const { titulo } = req.params;
        let tit = '%' + titulo + '%';
        const lib = await pool.query("SELECT libro.*,  editorial.nombre_editorial, area.descripcion_area FROM libro, editorial, area WHERE libro.id_editorial = editorial.id_editorial and libro.id_area = area.id_area and libro.titulo like $1", [tit] );
        console.log(lib.rows)
        res.json(lib.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// delete
app.delete("/delete_libro/:id_libro", async(req, res) => {
    try {
        const deleteLibros = await pool.query("DELETE FROM libro WHERE id_libro = $1", [req.params["id_libro"]]);
        res.json("Delete complete");
    } catch (err) {
        console.log(err.message);
    }
});

//-------------------------------------------

//Areas
app.get("/get_areas", async(req, res) => {
    try {
        const areas = await pool.query("SELECT * FROM area");
        res.json(areas.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//------Multas
app.get("/total_multas", async(req, res) => {
    try {
        const multas = await pool.query("select count(multa) from prestamo where multa = true;");
        res.json(multas.rows);
    } catch (err) {
        console.log(err.message);
    }
});


app.listen(3000, () => {
    console.log("server is working");
});