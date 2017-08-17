'use strict'

const User      = require('../models/userModel')

function getSettings(req, res) {
  // console.log("Account controller");
  // Models
  // console.log('User_id' + req.user);
  User.findById(req.user, (err, user) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición... ${err} `})
    if (!user) return res.status(404).send({message : `User does not exist`});

    res.status(200).send({ user })
  })
  //res.status(200).send('{"message": "Tienes Acceso"}');
}
module.exports = {
  getSettings
}
