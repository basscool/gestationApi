
const express = require('express');

const router = express.Router();

const dashboardCtrl = require('../controllers/dashboard');

router.get('/station',dashboardCtrl.prelevement);
router.get('/depense',dashboardCtrl.depense);

module.exports = router;
