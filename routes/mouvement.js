const express = require('express');

const router = express.Router();

const mouvementCtrl = require('../controllers/mouvement');

router.get('/',mouvementCtrl.getAllMouvement);
router.get('/pompe/:id',mouvementCtrl.searchMouvement);
router.post('/',mouvementCtrl.createMouvement);
router.get('/:id',mouvementCtrl.getOneMouvement);
router.put('/:id',mouvementCtrl.modifyMouvement);
router.delete('/:id' ,mouvementCtrl.deleteMouvement);

module.exports = router;
