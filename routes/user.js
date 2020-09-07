
const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/auth/signup', userCtrl.signup);
router.post('/auth/login', userCtrl.login);
router.get('/user', userCtrl.getAllUser);
router.get('/user/:id', userCtrl.getOneUser);
router.put('/user/:id', userCtrl.modifyUser);
//router.put('/user/passwor/:id', userCtrl.modifyPassword);
router.delete('/user/:id' ,userCtrl.deleteUser);
/*

router.get('/user/:id', userCtrl.getOneStation);*/



module.exports = router;