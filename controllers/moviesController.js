// Importo il file di connessione al database
const connection = require('../data/db');

function index(req, res) {

    // preparo la query
    const sql = 'SELECT * FROM movies';

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        results.map(movie => {
            movie.image = req.imagePath + movie.image;
        })
        res.json(results);
    });
}

function show(req, res) {

    // recupero l'id dall' URL della richiesta
    const id = req.params.id;

    // prima query di ricerca del singolo film
    // utilizzo una LEFT JOIN per poter avere tutti i film, anche quelli che non hanno nessuna recensione
    const movieSql = ` 
    SELECT M.* , ROUND(AVG(R.vote),1) AS average_vote
    FROM movies M 
    LEFT JOIN reviews R 
    ON R.movie_id = M.id 
    WHERE M.id = ?
    GROUP BY M.id`;

    // seconda query per le recensioni associate al film
    const reviewSql = `
    SELECT R.*
    FROM movies AS M
    JOIN reviews AS R ON R.movie_id = M.id
    WHERE M.id = ? `;

    connection.query(movieSql, [id], (err, movieResults) => {
        // gestisco errore server mysql
        if (err) return res.status(500).json({ error: "Database error" })
        // gestisco anche errore 404
        if (movieResults.length === 0) return res.status(404).json({ error: 'Movie not found' });
        console.log(err);

        // Recupero il singolo film
        const movie = movieResults[0];

        // aggiungo il path fornito dal middleware per le immagini all'immagine del film
        movie.image = req.imagePath + movie.image;

        // Se la prima query ha avuto successo, eseguo la seconda query per le recensioni
        connection.query(reviewSql, [id], (err, results) => {
            // gestisco errore server mysql
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // Aggiungo le recensioni al film
            movie.reviews = results;
            res.json(movie);
        });
    });
}

// esporto le funzioni che ho creato
module.exports = { index, show }