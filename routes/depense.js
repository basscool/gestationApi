const express = require('express');

const router = express.Router();

const depenseCtrl = require('../controllers/depense');

router.get('/',depenseCtrl.getAllDepense);
router.post('/',depenseCtrl.createDepense);
router.get('/:id',depenseCtrl.getOneDepense);
router.put('/:id',depenseCtrl.modifyDepense);
router.delete('/:id' ,depenseCtrl.deleteDepense);

module.exports = router;
