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


//create
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

//mostrar estudiante
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
        const student = await pool.query("SELECT * FROM estudiante where ci  = $1", [req.params["ci"]]);
        res.json(student.rows);
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

//gets

app.get("/show_editorial/", async(req, res) => {
    try {
        const allEdits = await pool.query("SELECT * FROM editorial");
        res.json(allEdits.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//Buscar editorial
app.get("/show_editorial/:id_editorial", async(req, res) => {
    try {
        const edit = await pool.query("select * from editorial where nombre_editorial  = ? ", [req.params["nombre_editorial"]]);
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


//Buscar prestamo
app.get("/show_prestamo/:fecha_prestamo", async(req, res) => {
    try {
        const prestamoo = await pool.query("SELECT * FROM prestamo where fecha_prestamo  = $2022-04-22", [req.params["fecha_prestamo"]]);
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

//multar un prestamo.

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

//pagar multa
app.put("/pagar_multa", async (req, res) => {
    try {
        console.log(req.body)
        const { id_lector, id_libro, fecha_prestamo, valor_multa } = req.body.newValue
        const pagarMulta = await pool.query("UPDATE prestamo SET devuelto = '1', valor_multa = $1 WHERE id_lector = $2 and id_libro = $3 and fecha_prestamo = $4", [valor_multa, id_lector, id_libro, fecha_prestamo]);
        res.json("Se ha pagado correctamente la multa");
    } catch (err) {
        console.log(err.message)
    }
})


//-------------------------------------------

//Libros

//get libros

app.get("/get_libros", async(req, res) => {
    try {
        const libros = await pool.query("SELECT * FROM libro");
        res.json(libros.rows);
    } catch (err) {
        console.log(err.message);
    }
});



app.listen(3000, () => {
    console.log("server is working");
});