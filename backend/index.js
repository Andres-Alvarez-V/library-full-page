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
        console.log(carrera);
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

//view a estudiantes 

//updates

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


app.listen(3000, () => {
    console.log("server is working");
});