const {Router} = require('express');
const userController = require('../controllers/userController');
const routes = Router();
const habilitarMod = require('../middleware/habilitarMod');
const habilitarVis = require('../middleware/habilitarVis');
const verifyToken = require('../middleware/verifyToken');
const cartController = require('./../controllers/cartController');





routes.post('/',userController.crearUsuario);
routes.post('/login',userController.loginUsuario);

routes.use(verifyToken)

routes.get('/:id/cart', habilitarVis, cartController.listCart);
routes.put('/:id/cart', habilitarMod,cartController.updateCart);

routes.get('/',userController.listaUsuarios);
routes.get('/:id',habilitarVis,userController.verUsuario);
routes.put('/:id',habilitarMod,userController.modificarUsuario);
routes.delete('/:id',habilitarMod,userController.eliminarUsuario);

module.exports = routes;