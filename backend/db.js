const Pool  =  require("pg").Pool;

const pool = new Pool({
    user : "postgres",
    password : "1034916004",
    host : "localhost",
    port: "5432",
    database: "Biblioteca"
});

module.exports = pool;