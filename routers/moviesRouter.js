// importo il framework express
const express = require("express");

// attivo il router
const router = express.Router();

// importo il controller della risorsa movies
const moviesController = require('../controllers/moviesController');

// Rotta /index che restituisce un oggetto json con la lista dei film
router.get('/', moviesController.index);

// Rotta /show/:id che restituisce un singolo film
router.get('/:id', moviesController.show);

// Rotta che permette di inserire una nuova recensione
router.post('/:id/reviews', moviesController.storeReview);


module.exports = router;