const Ticket = require('../models/Ticket');
const Product = require('../models/Product');

// Controlador para agregar un ticket de venta
const agregarTicket = async (req, res) => {
  try {
    const { productos } = req.body;

    // Extraer los IDs y cantidades del arreglo de productos
    const productosCarrito = productos.map(({ _id, cantidadCarrito }) => ({
      _id,
      cantidadCarrito
    }));

    const nuevoTicket = new Ticket(req.body);
    console.log(productosCarrito)

    for (let item of productosCarrito) {
      await Product.updateOne({ _id: item._id }, { $inc: { cantidad: -item.cantidadCarrito } });
    }

    await nuevoTicket.save();
    res.status(201).json({ message: 'Ticket de venta agregado correctamente' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al agregar el ticket de venta' });
  }
};

// Controlador para eliminar un ticket de venta
const eliminarTicket = async (req, res) => {
  const { id } = req.params;
  try {
    await Ticket.findByIdAndDelete(id);
    res.json({ message: 'Ticket de venta eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el ticket de venta' });
  }
};

const obtenerTickets = async (req, res) => {
    try {
      const tickets = await Ticket.find();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los tickets de ventas' });
    }
  };

module.exports = {
  agregarTicket,
  eliminarTicket,
  obtenerTickets
};
