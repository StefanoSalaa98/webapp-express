// importo il framework express
const express = require("express");

// Importo il file di connessione al database
const connection = require('./data/db');

// creo una istanza di express
const app = express();

// imposto il numero della porta
const port = 3000;

// registro il body-parser per "application/json"
// permette di leggere in formato json i dati inviati nella request
app.use(express.json());

// importo globalmente il middleware che gestisce errore per rotta inesistente
const notFound = require("./middlewares/notFound.js");

// importo globalmente il middleware che gestisce l'errore del server
const errorServer = require("./middlewares/errorServer");

// importo il modulo del router per i movies
const moviesRouter = require("./routers/moviesRouter.js")

// uso il middleware static di express per rendere disponibile i file statici
app.use(express.static('public'));

// rotte per i movies
app.use("/api/movies", moviesRouter);

// imposto la rotta di home
app.get("/api/", (req, res) => {

    res.send('<h1> Server del mio blog di film </h1>')
})

app.get("/movies", (req, res) => {
    console.log("Funzione index");

    // preparo la query
    const sql = 'SELECT * FROM movies';

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
})


// richiamo middleware gestione errore per rotta non esistente
// deve essere richiamato dopo le rotte
app.use(notFound);

// richiamo middleware gestione errori del server
app.use(errorServer);

// metto in ascolto il server sulla porta definita
app.listen(port, () => {
    console.log(`Movie app listening on port ${port}`);
});