const express = require('express');

const router = express.Router();

const mouvementCtrl = require('../controllers/depense_extraction');

router.post('/',mouvementCtrl.getAllDepense);


module.exports = router;
