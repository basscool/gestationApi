const express = require('express');

const router = express.Router();

const mouvementCtrl = require('../controllers/categorie_depense');

router.get('/',mouvementCtrl.getAllCategorieDepense);
//router.get('/pompe/:id',mouvementCtrl.searchMouvement);
router.post('/',mouvementCtrl.createCategorieDepense);
router.get('/:id',mouvementCtrl.getOneCategorieDepense);
router.put('/:id',mouvementCtrl.modifyCategorieDepense);
router.delete('/:id' ,mouvementCtrl.deleteCategorieDepense);

module.exports = router;
