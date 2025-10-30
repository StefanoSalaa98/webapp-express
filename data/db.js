//importo il pacchetto mysql2
const mysql = require('mysql2');

// uso il metodo di creazione oggetto di connessione
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// avvio la connesione tramite il metodo connect
connection.connect((err) => {
    if (err) throw err;
    console.log('Connessione riuscita!');
});

// esporto il modulo CJS
module.exports = connection;