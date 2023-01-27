const Delivery = require('../models').Delivery;

const to = require('await-to-js').default

module.exports = {
  getAll: async (req, res) => {
    const [err, deliveries] = await to(Delivery.findAll());
    if (err) throw err;
    return res.status(200).send({ deliveries })
  },
  create: async (req, res) => {
    const [errCreate, newDevilery] = await to(Delivery.create({
        company: req.body.company,
        delivery: req.body.delivery,
        address: req.body.address,
        phone: req.body.phone,
        INN: req.body.INN,
    }))
    if (errCreate)  return res.status(500).send(errCreate) 
    return res.status(201).send({ devilery: newDevilery })
  },
  remove: async (req, res) => {
    const [errCreate] = await to(Delivery.destroy({
      where: {
        id: req.params.id
      }
    }))
    if (errCreate)  return res.status(500).send(errCreate) 
    return res.status(200).send({});
  },
}
