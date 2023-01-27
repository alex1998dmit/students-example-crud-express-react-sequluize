const Author = require('../models').Author;

const to = require('await-to-js').default

module.exports = {
  getAll: async (req, res) => {
    const [err, authors] = await to(Author.findAll());
    if (err) throw err;
    return res.status(200).send({ authors })
  },
  create: async (req, res) => {
    const [errCreate, newAuthor] = await to(Author.create({
        name_author: req.body.name_author || '',
        birthday: req.body.birthday,
    }))
    if (errCreate)  return res.status(500).send(errCreate) 
    return res.status(201).send({ autor: newAuthor })
  },
  remove: async (req, res) => {
    const [errCreate] = await to(Author.destroy({
      where: {
        id: req.params.id
      }
    }))
    if (errCreate)  return res.status(500).send(errCreate) 
    return res.status(200).send({});
  },
  patch: async (req, res) => {
    const [err, author] = await to(Author.findByPk(req.params.id))
    if (err) return res.status(500).send(err)
    if (!author) return res.status(404).send({ message: 'author Not Found' })
    const [errPatch] = await to(author.update({
      ...(name_author && { name_author: req.body.name_author }),
      ...(birthday && { birthday: req.body.birthday }),
    }))
    if (errPatch) return res.status(400).send(err)
    return res.status(202).send(leader)
  }
}