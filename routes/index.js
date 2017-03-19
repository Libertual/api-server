'use strict'

const express     = require('express')
const productCtrl = require('../controllers/productCtrl')
const heroCtrl = require('../controllers/heroCtrl')

// Middlewares
const auth        = require('../middlewares/authMidlw')

const api = express.Router()

//console.log(auth.isAuth)

api.get('/hero/:heroId', heroCtrl.getHero)
api.get('/heroes', heroCtrl.getHeroes)
api.post('/hero', heroCtrl.saveHero)
api.get('/product/:productId', productCtrl.getProduct)
api.get('/products', productCtrl.getProducts)
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)
api.get('/private', auth.isAuth, function (req, res) {
  res.status(200).send({message: `Tienes Acceso`})
})

module.exports = api
