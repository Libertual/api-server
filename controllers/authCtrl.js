// Libraries
// const mongoose = require('mongoose')
// Models
const User = require('../models/userModel');
// Services
const service = require('../services');

function register(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  });
  user.token = service.createToken(user);
  // console.log('user: ' + user)
  user.save((err) => {
    // console.log(err);
    if (err) {
      if (err.code === '11000') return res.status(422).send({
        message: `Error, ya existe un usuario con email ${req.body.emailmongo}`
      });
      return res.status(500).send({ message: 'Error al crear el usuario' });
    }

    return res.status(200).send({
      message: 'Usuario registrado correctamente',
      token: service.createToken(user)
    });
  });
}

function login(req, res) {
  // console.log(JSON.stringify(req.body));

  User.findOne({ email: req.body.email }, '+password', (err, user) => {
    if (err) return res.statu(500).send({
      message: 'Error en la petición'
    });
    if (!user) return res.status(404).send({
      message: `Error, usuario no encontrado: ${req.body.email}`
    });

    user.comparePasword(req.body.password, (error, isMatch) => {
      if (error) return res.status(500).send({
        message: 'Error al comprobar la password'
      });
      if (!isMatch) return res.status(401).send({
        message: 'Error, contraseña incorrecta'
      });
      //  devolver token
      return res.status(200).send({
        token: service.createToken(user),
        user
      });
    });
    return null;
  });
}

module.exports = {
  register,
  login
};
