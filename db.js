const mongoose = require('mongoose');

mongoose
  .connect(process.env.BD || 'mongodb://localhost/unias', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Base de datos conectada'))
  .catch((err) => console.log(err));
