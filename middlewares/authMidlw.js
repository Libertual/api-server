'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function isAuth (req, res, next) {
  if(!req.headers.authorization) {
    return res.status(403).send({message: 'No tienes autorización'})
  }

  const token = req.header('Authorization').split(" ")[1]

  const payload = jwt.decode(token, config.SECRET_TOKEN, true)

  //console.log("Payload: " + JSON.stringify(payload));
  if (payload.exp <= moment().unix()){
    res.status(401).send({message: `La sesión ha expirado`});
  }
  else{
  req.user = payload.sub;
//  console.log('req.user');
//  console.log(req.user);
  next();
  }
}

module.exports = {isAuth:isAuth}
