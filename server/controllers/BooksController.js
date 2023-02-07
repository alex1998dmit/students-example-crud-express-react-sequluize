const { paginate, getOffset, getNextPage, getPreviousPage } = require('../utlils/paginate');
const { Op } = require('sequelize');
const Book = require('../models').Book;

const to = require('await-to-js').default

module.exports = {
  getAll: async (req, res) => {
    const {
      title_book,
      pages,
      AuthorId,
      PublishHouseId,
      ordering,
      orderDirection,
    } = req.query;
    // console.log(search);
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    let order = [];
    
    if (ordering) {
      order = [
        [ordering, orderDirection ?? 'ASC']
      ]      
    }

    let {count, rows} = await Book.findAndCountAll({
      offset: getOffset(page, limit),
      limit: limit,
      include: ["Author", "PublishHouse"],
      order,
      where: {
        ...(AuthorId && { AuthorId }),
        ...(PublishHouseId && { PublishHouseId }),
        ...(title_book && {
          title_book: {
            [Op.substring]: title_book,
          }
        })
      }        
    });

    const resp = {
      previousPage: getPreviousPage(page),
      currentPage: page,
      nextPage: getNextPage(page, limit, count),
      total: count,
      limit: limit,
      data: rows
    }
    return res.status(200).send(resp)
  },
  create: async (req, res) => {
    const [errCreate, newBook] = await to(Book.create({
        title_book: req.body.title_book,
        pages: req.body.pages,
        AuthorId: req.body.AuthorId,
        PublishHouseId: req.body.PublishHouseId
    }))
    if (errCreate)  return res.status(500).send(errCreate) 
    return res.status(201).send({ book: newBook })
  },
  remove: async (req, res) => {
    const [errCreate] = await to(Book.destroy({
      where: {
        id: req.params.id
      }
    }))
    if (errCreate)  return res.status(500).send(errCreate) 
    return res.status(200).send({});
  },
  patch: async (req, res) => {
    const [err, book] = await to(Book.findByPk(req.params.id))
    if (err) return res.status(500).send(err)
    if (!book) return res.status(404).send({ message: 'Book Not Found' })
    const [errPatch] = await to(book.update({
      ...(req.body.title_book && { title_book: req.body.title_book }),
      ...(req.body.pages && { pages: req.body.pages }),
      ...(req.body.AuthorId && { AuthorId: req.body.AuthorId }),
      ...(req.body.PublishHouseId && { PublishHouseId: req.body.PublishHouseId })
    }))
    if (errPatch) return res.status(400).send(err)
    return res.status(202).send(book)
  }
}