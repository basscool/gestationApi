
const express = require('express');



const router = express.Router();


const stationCtrl = require('../controllers/station');

router.get('/',stationCtrl.getAllStation);
router.post('/',stationCtrl.createStation);
router.get('/:id',stationCtrl.getOneStation);
router.put('/:id',stationCtrl.modifyStation);
router.delete('/:id' ,stationCtrl.deleteStation);

module.exports = router;
