const express = require('express');
const router = express.Router();
const pictureController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody');
const habilitarMod = require('../middleware/habilitarMod');
const verifyToken = require('../middleware/verifyToken');
const habilitarVis = require('../middleware/habilitarVis');


router.use(verifyToken);

router.get('/:id',habilitarVis,middlewareIDinBody,pictureController.listPictureID);

router.get('/',habilitarVis,middlewareIDinBody,pictureController.listPictures);

router.post('/',habilitarMod,pictureController.create);

router.put('/:id',habilitarMod,pictureController.edit);

router.delete('/:id',habilitarMod,pictureController.delete);


module.exports = router;