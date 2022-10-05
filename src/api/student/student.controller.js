const Student = require('./student.model');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');



module.exports = {

  async signup (req, res) {
    try {
      const { fullname, email, password } = req.body

      const encriptedPassord = await bcrypt.hash(password, 11)
      const student = await Student.create({ fullname:fullname, email:email, password:encriptedPassord })

      const token  = jwt.sign(
        { id: student._id},
          process.env.SECRET_KEY_JWT,
        { expiresIn: 60 * 60 * 24}//one day
      )
      res.status(201).json({ info: { token, email, fullname}, message: "✅student created" })
    } catch (error) {
      res.status(400).json({ message: "student could NOT be created"})
    }
  },

  //signin/login
  async login(req, res) {
    try {
      const { email, password } = req.body
//validate email
      const student = await Student.find({ email })
      if(!student){
        throw new Error('invalid credentials')
      }
      //validate password
        //compare 2 arguments 1 password and hashed password
      const isValid = await bcrypt.compare( password, student.password)

      if(!isValid){
        throw new error('invalid credentials')
      }

      const token  = jwt.sign(
        { id: student._id},
        process.env.SECRET_KEY_JWT,
        { expiresIn: 60 * 60 * 24}
      )

      res.status(201).json({  message: "student loged in" })

    } catch (error) {
      res.status(400).json({ message: "student could not login"})
    }
  },

}
