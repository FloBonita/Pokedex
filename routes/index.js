const express = require('express');
const homeController = require('../controllers/homeController');

//Rotas

const router = express.Router()
router.get('/', homeController.index);


module.exports = router;