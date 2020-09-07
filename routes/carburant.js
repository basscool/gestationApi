
const express = require('express');



const router = express.Router();


const carburantCtrl = require('../controllers/carburant');

router.get('/',carburantCtrl.getAllCarburant);
router.post('/',carburantCtrl.createCarburant);
router.get('/:id',carburantCtrl.getOneCarburant);
router.put('/:id',carburantCtrl.modifyCarburant);
router.delete('/:id' ,carburantCtrl.deleteCarburant);

module.exports = router;
