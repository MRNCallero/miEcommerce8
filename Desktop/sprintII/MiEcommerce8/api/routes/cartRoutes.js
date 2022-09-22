const express = require('express');
const router = express.Router();
const habilitarMod = require('../middleware/habilitarMod');
const habilitarVis = require('../middleware/habilitarVis');
const verifyToken = require('../middleware/verifyToken');

const controller = require('./../controllers/cartController');

router.use(verifyToken);

router.get('/:id', habilitarVis, controller.listCart);

router.put('/:id', habilitarMod,controller.updateCart);

module.exports = router;