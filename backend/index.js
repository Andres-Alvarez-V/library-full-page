const express = require("express");
const app  =  express();
const cors = require("cors");
const pool = require("./db");
const { json } = require("express");
//middleware
app.use(cors());
app.use(express.json());
//ROUTES//
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
//view a estudiantes 

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


app.listen(3000, () => {
    console.log("server is working");
});