const jwt = require('jsonwebtoken');

// Middleware para verificar si el token es válido
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, 'secreto');
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Token de autenticación inválido' });
  }
};

// Middleware para verificar si el token contiene el rol de "admin"
const verifyAdminRole = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador' });
  }

  next();
};

module.exports = {
  verifyToken,
  verifyAdminRole,
};
