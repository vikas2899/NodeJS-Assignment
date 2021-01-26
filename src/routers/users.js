const express = require("express");
const User = require("../models/users");
const router = express.Router();

const ampq = require('amqplib')
ampq.connect(`ampq://localhost`, (err, connection) => {
  if(err) {
    throw err;
  }
  connection.createChannel((err, channel) => {
    let queueName = "Assignment_User"
    

  })
})

// Creating User
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Fetch user based on id
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).send("Invalid Id");
    }
    res.send({"name" : user.name, "email" : user.email});
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
