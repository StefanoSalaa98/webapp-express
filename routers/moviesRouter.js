// importo il framework express
const express = require("express");

// attivo il router
const router = express.Router();

// importo il controller della risorsa posts
const moviesController = require('../controllers/moviesController');

// Rotta /index che restituisca un oggetto json con la lista dei post filtrati o non.
router.get('/', moviesController.index);

// Rotta /show/:id che restituisca un singolo post
router.get('/:id', moviesController.show);



module.exports = router;