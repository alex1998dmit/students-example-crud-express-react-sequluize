const PublishHouse = require('../models').PublishHouse;

const to = require('await-to-js').default

module.exports = {
  getAll: async (req, res) => {
    const [err, houses] = await to(PublishHouse.findAll());
    if (err) throw err;
    return res.status(200).send({ houses })
  },
  create: async (req, res) => {
    const [errCreate, newHouse] = await to(PublishHouse.create({
        publish: req.body.publish,
        city: req.body.city,
    }))
    if (errCreate)  return res.status(500).send(errCreate) 
    return res.status(201).send({ house: newHouse })
  },
  remove: async (req, res) => {
    const [errCreate] = await to(PublishHouse.destroy({
      where: {
        id: req.params.id
      }
    }))
    if (errCreate)  return res.status(500).send(errCreate) 
    return res.status(200).send({});
  },
}