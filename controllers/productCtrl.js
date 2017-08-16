'use strict'

const Product   = require('../models/productModel')

function getProduct(req,res){
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición... ${err} `})

    if (!product) return res.status(404).send({message : `Producto ${productId} no encontrado.`})

    res.status(200).send({ product })
  })
}
function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición... ${err}`})

    if (!products) return res.status(404).send({message: `No se han encontrado productos`})
      res.status(200).send({ products })
  })
}
function saveProduct(req, res){
  console.log(req.body)

  let product = new Product()
  product.name        = req.body.name
  product.picture     = req.body.name
  product.price       = req.body.price
  product.category    = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) return res.status(500).send({message: `Error al guardar el producto en la base de datos: ${err} `})
    res.status(200).send({product: productStored})
  } )
}

function updateProduct(req, res){
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) return res.status(500).send({message: `Error al actualizar el producto en la base de datos: ${err} `})

    res.status(200).send({product : productUpdated})
  })

}

function deleteProduct(req,res){
  let productId = req.params.productId

  Product.findById(productId, (err,product) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición... ${err}`})
    if(!product) return res.status(404).send({message : `Producto ${productId} no encontrado.`})

    product.remove(err => {
      if (err) return res.status(500).send({message: `Error al borrar el producto... ${productId}`})
      res.status(200).send({message: `El producto ${productId} ha sido borrado correctamente`})


    })

  })

}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
