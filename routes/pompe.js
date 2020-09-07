
const express = require('express');

const router = express.Router();

const pompeCtrl = require('../controllers/pompe');

router.get('/station/:id',pompeCtrl.searchPompe);
router.get('/',pompeCtrl.getAllPompe);
router.post('/',pompeCtrl.createPompe);
router.get('/:id',pompeCtrl.getOnePompe);
router.put('/:id',pompeCtrl.modifyPompe);
router.delete('/:id' ,pompeCtrl.deletePompe);



module.exports = router;
