let express = require('express')
let router = express.Router()
const {
    AuthorsController,
    BooksController,
    PublishHousesController,
    DeliveriesController,
    PurchasesController
} = require('../controllers');

router.get('/authors', AuthorsController.getAll);
router.post('/authors', AuthorsController.create);

router.get('/books', BooksController.getAll);
router.post('/books', BooksController.create);
router.patch('/books/:id', BooksController.patch);
router.delete('/books/:id', BooksController.remove);


router.get('/publish_houses', PublishHousesController.getAll);
router.post('/publish_houses', PublishHousesController.create);

router.get('/deliveries', DeliveriesController.getAll);
router.post('/deliveries', DeliveriesController.create);


router.get('/purchases', PurchasesController.getAll);
router.post('/purchases', PurchasesController.create);

module.exports = router
