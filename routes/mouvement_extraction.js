const express = require('express');

const router = express.Router();

const mouvementCtrl = require('../controllers/mouvement_extraction');

router.post('/',mouvementCtrl.getAllMouvement);


module.exports = router;
