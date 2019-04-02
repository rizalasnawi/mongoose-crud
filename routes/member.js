const router = require('express').Router();
const Controller = require('../controller/member');

router.get('/members', Controller.read);
router.get('/members/:id', Controller.readOne);
router.post('/members', Controller.create);
router.put('/members/:id', Controller.update);
router.patch('/members/:id', Controller.edit);
router.delete('/members/:id', Controller.delete);


module.exports = router