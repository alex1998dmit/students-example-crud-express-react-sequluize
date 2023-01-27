const Purchase = require('../models').Purchase;

const to = require('await-to-js').default

module.exports = {
  getAll: async (req, res) => {
    const [err, purchases] = await to(Purchase.findAll({
        include: ["Book", "Delivery"]
    }));
    if (err) throw err;
    return res.status(200).send({ purchases })
  },
  create: async (req, res) => {
    const [errCreate, newPurchase] = await to(Purchase.create({
        order_date: req.body.order_date,
        type: req.body.type,
        cost: req.body.cost,
        amount: req.body.amount,
        BookId: req.body.BookId,
        DeliveryId: req.body.DeliveryId
    }))
    if (errCreate)  return res.status(500).send(errCreate) 
    return res.status(201).send({ purchase: newPurchase })
  },
  remove: async (req, res) => {
    const [errCreate] = await to(Purchase.destroy({
      where: {
        id: req.params.id
      }
    }))
    if (errCreate)  return res.status(500).send(errCreate) 
    return res.status(200).send({});
  },
}