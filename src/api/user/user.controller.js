const User = require('./user.model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');



module.exports = {
/* signup */
  async signup (req, res) {
    try {
      const { fullName, email, password } = req.body

      const encriptedPassord = await bcrypt.hash(password, 11)
      const user = await User.create({ fullName:fullName, email:email, password:encriptedPassord })

      const token  = jwt.sign(
        { id: user._id},
        process.env.SECRET_KEY_JWT,
        { expiresIn: 60 * 60 * 24}//one day
      )
      res.status(201).json({ info: { token, email, fullName}, message: "✅user created" })
    } catch (error) {
      res.status(400).json({ message: `❌user could NOT be created ${error}`})
    }
  },

  /* login */
  async login(req, res) {
    try {
      const { email, password } = req.body
      //validate email
      const user = await User.find({ email })
      if(!user){
        throw new Error({message:`invalid credentials`})
      }
      //validate password
      //compare 2 arguments 1 password and hashed password
      const isValid = await bcrypt.compare( password, user.password)

      if(!isValid){
        throw new error({message:`invalid credentials`})
      }

      const token  = jwt.sign(
        { id: student._id},
        process.env.SECRET_KEY_JWT,
        { expiresIn: 60 * 60 * 24}
      )

      res.status(201).json({  message: "✅user logged in" })

    } catch (error) {
      res.status(400).json({ message: `❌student could not login ${error}`})
    }
  },
}
