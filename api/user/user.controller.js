//logica para almacenar los datos
const User = require('./user.model');

const { update } = require("./user.model")


module.exports = {
  //GET - list
  //GET:id - Show
  //POST - create
  //PUT - update
  //DELETE - destroy


  // GET
  list(req, res) {
    User.find()
      .then((User) => {
        res.status(200).json({ message: "User found", data: user })
      })
      .catch((err) => {
        res.status(400).json({ message: "User not found", data: err })
      })
  },

  // GET:id
  show(req, res) {
    const { userId } = req.params

    User.findById(userId)
      .then((user) => {
        res.status(200).json({ message: "user found", data: user })
      })
      .catch((err) => {
        res.status(400).json({ message: "user not found", data: err })
      })

  },


  //POST-create
create(req, res) {
  const data = req.body

  const newUser = {
    ...data,
  }

  User.create(newUser)
    .then((user) => {
      res.status(201).json({ message: "user created", data: user })
    })
    .catch((err) => {
      res.status(400).json({ message: "user could not be created", data: err })
    })
},

  // PUT:id
  update(req, res) {
    const { userId } = req.params

    User.findByIdAndUpdate(userId, req.body, { new: true })
      .then((user) => {
        res.status(200).json({ message: "user updated", data: user })
      })
      .catch((err) => {
        res.status(400).json({ message: "user could not be updated", data: err })
      })
  },

  // DELETE:id
  destroy(req, res) {
    const { userId } = req.params

    User.findByIdAndDelete(userId)
      .then((user) => {
        res.status(200).json({ message: "user deleted", data: user })
      })
      .catch((err) => {
        res.status(400).json({ message: "user could not be deleted", data: err })
      })
  }
}
