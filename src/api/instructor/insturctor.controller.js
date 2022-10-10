const User = require('../user/user.model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

module.exports = {
/* signup */
  async signup (req, res) {
    try {
      const { fullName, email, password, } = req.body

      const encriptedPassord = await bcrypt.hash(password, 11)
      const user = await User.create({ fullName:fullName, email:email, password:encriptedPassord, isInstructor:true })

      const token  = jwt.sign(
        { id: user._id},
        process.env.SECRET_KEY_JWT,
        { expiresIn: 60 * 60 * 24}//one day
      )
      res.status(201).json({ info: { token, email, fullName}, message: "✅Instructor created" })
    } catch (error) {
      res.status(400).json({ message: `❌Instructor could NOT be created ${error}`})
    }
  },
}
