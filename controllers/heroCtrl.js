'use strict'

const Hero   = require('../models/heroModel')

function getHero(req,res){
  let heroId = req.params.heroId

  Hero.findById(heroId, (err, hero) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición... ${err} `})

    if (!hero) return res.status(404).send({message : `Producto ${productId} no encontrado.`})

    res.status(200).send({ hero })
  })
}
function getHeroes(req, res) {
  Hero.find({}, (err, hero) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición... ${err}`})

    if (!hero) return res.status(404).send({message: `No se han encontrado productos`})

      let respuesta = {
        id: hero[0].id,
        name: hero[0].name
      }
      console.log(hero)
      res.status(200).send(hero)
  })
}

function saveHero(req, res){
  console.log(req.body)

  let hero = new Hero()
  hero.name        = req.body.name
  hero.id     = req.body.id

  hero.save((err, heroStored) => {
    if (err) return res.status(500).send({message: `Error al guardar el heroe en la base de datos: ${err} `})
    res.status(200).send({hero: heroStored})
  } )
}


module.exports = {
  getHero,
  getHeroes,
  saveHero
}
