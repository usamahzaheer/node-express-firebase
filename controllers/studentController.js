"use strict";

const firebase = require("../db");
const Student = require("../models/student");
const firestore = firebase.firestore();
const { sign } = require("jsonwebtoken");

const addStudent = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("students").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getAllStudents = async (req, res, next) => {
  try {
    const students = await firestore.collection("students");
    const data = await students.get();
    const studentsArray = [];
    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      data.forEach((doc) => {
        const student = new Student(
          doc.id,
          doc.data().firstName,
          doc.data().email,
          doc.data().lastName,
          doc.data().password,
          doc.data().phoneNumber
        );
        studentsArray.push(student);
      });
      res.send(studentsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getStudentByStudentId = async (req, res, next) => {
  try {
    const student = await firestore.collection("students").doc(req.params.id);
    const data = await student.get();
    if (!data.exists) {
      res.status(404).send("Student with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


const Login = async (req, res, next) => {
  try {
    const snapshot = await firestore.collection("students").get();

    if (snapshot.empty) {
      res.status(404).send("No student record found");
    } else {
      const passwordList = snapshot.docs.map((doc) => doc.data().password);
      const emailList = snapshot.docs.map((doc) => doc.data().email);

      for (let i = 0; i < emailList.length; i++) 
      {
        if (req.body.email === emailList[i] && req.body.password === passwordList[i]) {
          const jsontoken = sign({ id: snapshot.docs.map((doc) => doc.id) }, process.env.JWT_KEY, {
            expiresIn: "1h"
          });
          return res.json({
            success: 1,
            message: "login successfully",
            token: jsontoken
          });
          } 
      }
      res.send("wrong password or email");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


const updateStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const student = await firestore.collection("students").doc(id);
    await student.update(data);
    res.send("Student record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("students").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addStudentData = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("/students/yLNASpspyCytIyn0bwmi/data").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const deleteStudentData = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("/students/yLNASpspyCytIyn0bwmi/data").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  addStudent,
  getAllStudents,
  getStudentByStudentId,
  Login,
  updateStudent,
  deleteStudent,
  addStudentData,
  deleteStudentData
};
