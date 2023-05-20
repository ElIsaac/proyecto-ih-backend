// Importar los módulos necesarios
const mongoose = require('mongoose');

// Definir el esquema del producto
const productoSchema = new mongoose.Schema({
  _id: String,
  name: String,
  descripcion: String,
  precio: Number,
  cantidad: Number,
  __v: { type: Number, default: 0 },
  cantidadCarrito: Number,
  total: Number
});

// Definir el esquema principal con el arreglo de productos
const ticketSchema = new mongoose.Schema({
  productos: [productoSchema],
  createdAt: { type: Date, default: Date.now },
  valorTotal: { type: Number, default: 0 }
});

// Middleware para calcular el valor total antes de guardar el ticket
ticketSchema.pre('save', function (next) {
  this.valorTotal = this.productos.reduce((total, producto) => total + producto.total, 0);
  next();
});

// Crear el modelo a partir del esquema
const Ticket = mongoose.model('Ticket', ticketSchema);

// Exportar el modelo
module.exports = Ticket;
