const express = require('express');
const {
    addStudent,
    getAllStudents, 
    getStudentByStudentId,
    Login,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');

const router = express.Router();
const {checkToken} = require("../auth/token_validation");

router.post('/student', addStudent);
router.get('/students',checkToken, getAllStudents);
router.get('/student/:id',checkToken, getStudentByStudentId);
router.post('/Login', Login)
router.patch('/student/:id',checkToken, updateStudent);
router.delete('/student/:id',checkToken, deleteStudent);

module.exports = {
    routes: router
}