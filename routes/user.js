const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/userController.js');

const usersController = new UsersController();

router.get('/', (req, res, next)=>{
    usersController.getUsers(req.body)
    .then((result) => {
        res.send(result);
    })
});
router.post('/', (req, res, next)=>{
    usersController.postUser(req.body)
    .then((result) => {
        res.send(result);
    })
});

router.delete('/:id', (req, res, next) => {
    usersController.deleteUser(req.params.id)
    .then((result) => {
        console.log("result delete", result);  
        res.send(result);
    })
});

router.get('/:id', (req, res, next) => {
    usersController.getUserById(req.params.id)
    .then((result) => {
        res.send(result);
    })
});

router.get('/idBD/:objectId', (req, res, next) => {
    usersController.getUserByIdBD(req.params.objectId)
    .then((result) => {
        res.send(result);
    })
});

router.put('/:id', (req, res, next) => {
    usersController.updateUser(req.params.id, req.body)
    .then((result) => {
        console.log("result put", result);  
        res.send(result);
    })
});


module.exports = router;