const router = require('express').Router();
const Controller = require('../controller/book');

router.get('/books', Controller.read);
router.get('/boooks/:id', Controller.readOne);
router.post('/books', Controller.create);
router.put('/books/:id', Controller.update);
router.patch('/books/:id', Controller.edit);
router.delete('/books/:id', Controller.delete);


module.exports = router