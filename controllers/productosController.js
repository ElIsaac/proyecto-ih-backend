const Product = require('../models/Product');

const getProductos = async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

const agregarProducto = async (req, res) => {
  try {
    const { id, name, descripcion, precio, cantidad } = req.body;
    const producto = new Product({
      id,
      name,
      descripcion,
      precio,
      cantidad,
    });
    await producto.save();
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar un nuevo producto' });
  }
};

const getProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Product.findOne({ id });
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la información del producto' });
  }
};

const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const producto = await Product.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const producto = await Product.findByIdAndRemove(id);
    
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  getProductos,
  agregarProducto,
  getProducto,
  actualizarProducto,
  eliminarProducto,
};
