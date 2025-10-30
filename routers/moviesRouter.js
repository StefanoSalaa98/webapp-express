// importo il framework express
const express = require("express");

// attivo il router
const router = express.Router();



// Rotta /index che restituisca un oggetto json con la lista dei post filtrati o non.
router.get('/', function () { console.log("index") });

// Rotta /show/:id che restituisca un singolo post
router.get('/:id', function () { console.log("show") });



module.exports = router;