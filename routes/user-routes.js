const express = require('express');
const {
    addUser,
    getAllUsers, 
    getUserByUserId,
    Login,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const router = express.Router();
const {checkToken} = require("../auth/token_validation");

router.post('/user', addUser);
router.get('/users', getAllUsers);
router.get('/user/:id',checkToken, getUserByUserId);
router.post('/login', Login)
router.patch('/user/:id', updateUser);
router.delete('/User/:id', deleteUser);

module.exports = {
    routes: router
}