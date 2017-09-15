const User = require('../models/userModel');

function getSettings(req, res) {
  // console.log("Account controller");
  // Models
  // console.log('User_id' + req.user);
  const user = new User();

  User.findById(req.user, (err, userSet) => {
    if (err) return res.status(500).send({
      message: `Error al realizar la petición... ${err} `
    });
    if (!user) return res.status(404).send({
      message: 'User does not exist'
    });
    this.user = userSet;
    // this.user.avatar = userSet.gravatar();
    return res.status(200).send({
      user: this.user
    });
  });
  // res.status(200).send('{"message": "Tienes Acceso"}');
}

function changeSettings(req, res) {
  const userId = req.user; // UserId fron autentication header
  const user = req.body; // User from req.body
  console.log(req.body);
  if (userId !== user._id) return res.status(500).send(
    { message: 'Error al actualizar el usuario en la base de datos: No estás autorizado ' }
  );
  User.findByIdAndUpdate(userId, user, { new: true }, (err, userUpdated) => {
    if (err) return res.status(500).send({
      message: `Error al actualizar el producto en la base de datos: ${err} `
    });
    return res.status(200).send({
      message: 'Settings changed successfully',
      userUpdated
    });
  });
  return null;
}
module.exports = {
  getSettings,
  changeSettings
};
