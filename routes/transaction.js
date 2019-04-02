const router = require('express').Router();
const Controller = require('../controller/transaction');

router.get('/transactions', Controller.read);
router.get('/transactions/:id', Controller.readOne);
router.post('/transactions', Controller.create);
router.put('/transactions/:id', Controller.update);
router.patch('/transactions/:id', Controller.edit);
router.delete('/transactions/:id', Controller.delete);


module.exports = router