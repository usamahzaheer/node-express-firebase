"use strict";

const firebase = require("../db");
const User = require("../models/user");
const firestore = firebase.firestore();
const { sign } = require("jsonwebtoken");

const addUser = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("users").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await firestore.collection("users");
    const data = await users.get();
    const usersArray = [];
    if (data.empty) {
      res.status(404).send("No user record found");
    } else {
      data.forEach((doc) => {
        const user = new User(
          doc.id,
          doc.data().firstName,
          doc.data().email,
          doc.data().lastName,
          doc.data().password,
          doc.data().phoneNumber
        );
        usersArray.push(user);
      });
      res.send(usersArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserByUserId = async (req, res, next) => {
  try {
    const user = await firestore.collection("users").doc(req.params.id);
    const data = await user.get();
    if (!data.exists) {
      res.status(404).send("user with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


const Login = async (req, res, next) => {
  try {
    const snapshot = await firestore.collection("users").get();

    if (snapshot.empty) {
      res.status(404).send("No user record found");
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


const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await firestore.collection("users").doc(id);
    await user.update(data);
    res.send("user record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("users").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserByUserId,
  Login,
  updateUser,
  deleteUser,
};
