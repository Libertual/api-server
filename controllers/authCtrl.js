// Libraries
// const mongoose = require('mongoose')
// Models
const User = require('../models/userModel');
// Services
const service = require('../services');

function register(req, res) {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  });
  user.token = service.createToken(user);
  // console.log('user: ' + user)
  user.save((err) => {
    // console.log(err);
    if (err) {
      if (err.code === 11000)
        return res.status(422).send({
          message: `Error, user duplicated ${req.body.email}`
        });
      return res.status(500).send({ message: `Error al crear el usuario ${err}` });
    }
    return res.status(200).send({
      message: 'Usuario registrado correctamente',
      token: service.createToken(user)
    });
  });
}

function login(req, res) {
  // console.log(JSON.stringify(req.body));
//  console.log(`Username: ${req.body.userName}`);

  User.findOne({ userName: req.body.userName }, '+password', (err, user) => {
    if (err) return res.statu(500).send({
      message: 'Error en la petición'
    });
    // console.log(`User: ${user}`);
    if (!user) return res.status(404).send({
      message: `Error, usuario no encontrado: ${req.body.userName}`
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
  }).collation({ locale: 'en', strength: 2 });
}

module.exports = {
  register,
  login
};
