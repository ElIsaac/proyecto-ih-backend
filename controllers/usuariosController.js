const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({}, { password: 0 });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const getUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findById(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findByIdAndRemove(id);
    if (usuario) {
      res.json({ message: 'Usuario eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

const crearUsuario = async (req, res) => {
  const { name, role, email, password } = req.body;
  try {
    // Verificar que los campos obligatorios no estén vacíos
    if (!name || !role || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos
    const newUser = new User({
      name,
      role,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar el usuario por su correo electrónico
    const user = await User.findOne({ email });

    if (user) {
      // Comparar la contraseña encriptada
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        let role = 'user'; // Establecer el rol predeterminado a 'user'

        // Verificar si el usuario es administrador
        if (user.role === 'admin') {
          role = 'admin';
        }

        // Generar el JWT correspondiente al rol
        const token = jwt.sign({ id: user._id, role, name: user.name }, 'secreto', { expiresIn: '5h' });

        res.json({ token });
      } else {
        res.status(401).json({ error: 'Credenciales inválidas' });
      }
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = {
  getUsuarios,
  getUsuario,
  actualizarUsuario,
  eliminarUsuario,
  crearUsuario, 
  login
};
