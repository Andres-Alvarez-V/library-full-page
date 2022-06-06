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
        const newStudent = await pool.query("INSERT INTO estudiante (ci, nombre, direccion, carrera, edad) VALUES($1, $2, $3, $4, $5) RETURNING *", [CI, nombre_estudiante, direccion_estudiante, carrera, edad]);
        res.json(newStudent);
    } catch (err) { 
        res.status(900).send("Hubo un error al ejecutar la peticion");
        console.log(err.message);
    }
});
//gets
app.get("/show_students/", async(req, res) => {
    try {
        const allStudents = await pool.query("SELECT * FROM estudiante");
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

//get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        const { id } =  req.params;
        const allTodo = await pool.query("SELECT * FROM estudiante WHERE id = $1", [id]);
        res.json(allTodo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
//updates
app.put("/todos/:id", async(req, res) => {
    try {
        const { id } =  req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE prueba SET description = $1 WHERE id = $2", [description, id]);
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
        const edit = await pool.query("SELECT * FROM editorial where id_editorial = $1", [req.params["id_editorial"]]);
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

//Prestamo
//create
app.post("/new_prestamo", async(req, res) => {
    try {
        console.log(req.body)
        const { id_lector, id_libro, fecha_prestamo, fecha_devolucion, devuelto, multa, fecha_pago, valor_multaa} = req.body.newInfo;
        let valor_multa = parseInt(valor_multaa);
        const newPrestamo = await pool.query("INSERT INTO prestamo (id_lector, id_libro, fecha_prestamo, fecha_devolucion, devuelto, multa, fecha_pago, valor_multa) VALUES($1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING *", [id_lector, id_libro, fecha_prestamo, fecha_devolucion, devuelto, multa, fecha_pago, valor_multa]);
        res.json(newPrestamo);
    } catch (err) { 
        res.status(900).send("Hubo un error al ejecutar la peticion");
        console.log(err.message);
    }
});
//gets
app.get("/show_prestamos/", async(req, res) => {
    try {
        const allPrestamo = await pool.query("SELECT * FROM prestamo");
        res.json(allPrestamo.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//Buscar prestamo
app.get("/show_prestamo/:fecha_prestamo", async(req, res) => {
    try {
        const prestamoo = await pool.query("SELECT * FROM prestamo where fecha_prestamo  = $1", [req.params["fecha_prestamo"]]);
        res.json(prestamoo.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        const { id } =  req.params;
        const allTodo = await pool.query("SELECT * FROM prestamo WHERE id = $1", [id]);
        res.json(allTodo.rows);
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


app.listen(3000, () => {
    console.log("server is working");
});