// Importo il file di connessione al database
const connection = require('../data/db');

function index(req, res) {

    // preparo la query
    const sql = 'SELECT * FROM movies';

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

function show(req, res) {

    // recupero l'id dall' URL della richiesta
    const id = req.params.id;

    // prima query di ricerca della post singola
    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    // seconda query per i tag associati al post
    const tagsSql = `
    SELECT R.vote, R.text
    FROM movies AS M
    JOIN reviews AS R ON R.movie_id = M.id
    WHERE M.id = ? `;

    connection.query(movieSql, [id], (err, results) => {
        if (results.length === 0) return res.status(404).json({ error: 'Movie not found' });

        // Recupero il singolo post
        const movie = results[0];

        //
        movie.image = req.imagePath + movie.image;

        // Se la prima query ha avuto successo, eseguo la seconda query per i tags
        connection.query(tagsSql, [id], (err, results) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // Aggiungo le recensioni al film
            movie.reviews = results;
            res.json(movie);
        });
    });
}

// esporto le funzioni che ho creato
module.exports = { index, show }