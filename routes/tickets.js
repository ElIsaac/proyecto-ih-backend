const express = require('express');
const router = express.Router();
const { agregarTicket, eliminarTicket, obtenerTickets } = require('../controllers/ticketController');

// Ruta para agregar un ticket de venta
router.post('/', agregarTicket);
router.get('/', obtenerTickets);

// Ruta para eliminar un ticket de venta
router.delete('/:id', eliminarTicket);

module.exports = router;
