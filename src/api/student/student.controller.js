const Student = require('./student.model');
const jwt = require('jsonwebtoken');
const Student = require('./student.model')


module.exports = {

  async signup (req, res) {
    try {
      const { email, password } = req.body

      //bycrypt two arguments password and salt(number of process of encryption)
      const encriptedPassord = await bcrypt.hash(password, 11)
      const student = await Student.create({ email:email, password:encriptedPassord })
      //sing 3 arguments
      // what we want to code
      //"secret key any value"
      //times it expires in seconds
      const token  = jwt.sign(
        { id: student._id},
        "secretKey",
        { expiresIn: 60 * 60 * 24}
      )
      res.status(201).json({ token:token, message: "student created" })
    } catch (error) {
      res.status(400).json({ message: "student NOT created"})
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


  // create - post
  // async createStudent(req, res) {
  //   const data = req.body;
  //   const newStudent = {
  //     ...data,
  //   };
  //   try {
  //     const newStudent = await Student.create(newStudent)
  //     res.status(201).json({ message: "Student created", data: newStudent })
  //   } catch (error) {
  //     res.staut(400).json({message: "Student could not be created", data: error})
  //   }
  // }


}
