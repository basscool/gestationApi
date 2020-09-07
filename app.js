const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const carburantRoutes = require('./routes/carburant');
const stationRoutes = require('./routes/station');
const authRoutes = require('./routes/user');
const categorieDepenseRoutes = require('./routes/categorie_depense');
const pompeRoutes = require('./routes/pompe');
const depenseRoutes = require('./routes/depense');
const mouvementRoutes = require('./routes/mouvement');

const extractionPreRoutes = require('./routes/mouvement_extraction');
const extractionDepRoutes = require('./routes/depense_extraction');
const dashBoardRoutes = require('./routes/dashboard');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api/station', stationRoutes);
app.use('/api/carburant', carburantRoutes);
app.use('/api/catdepense', categorieDepenseRoutes);
app.use('/api/pompe', pompeRoutes);
app.use('/api/depense', depenseRoutes);
app.use('/api/mouvement', mouvementRoutes);
app.use('/api/extraction/prelevement', extractionPreRoutes);
app.use('/api/extraction/depense', extractionDepRoutes);
app.use('/api/dashboard', dashBoardRoutes);

module.exports = app;