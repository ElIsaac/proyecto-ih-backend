const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://elisaac:Elvatono1.m@proyecto-ihc.cqvtb4n.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Base de datos conectada'))
  .catch((err) => console.log(err));
