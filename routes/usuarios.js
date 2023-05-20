const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const {verifyAdminRole, verifyToken} = require('../middlewares/authMiddleware');

router.get('/', usuariosController.getUsuarios);
router.post('/', usuariosController.crearUsuario);
router.get('/:id', usuariosController.getUsuario);
router.put('/:id', usuariosController.actualizarUsuario);
router.delete('/:id', usuariosController.eliminarUsuario);
router.post('/login', usuariosController.login);
module.exports = router;

