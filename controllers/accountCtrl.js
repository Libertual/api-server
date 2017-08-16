'use strict'

function getSettings(req, res) {
  // console.log("Account controller");
  res.status(200).send('{"message": "Tienes Acceso"}');
}
module.exports = {
  getSettings
}
