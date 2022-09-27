const Student = require('./student.model')

module.exports = {

  // create - post
  async createStudent(req, res) {
    const data = req.body;
    const newStudent = {
      ...data,
    };
    try {
      const newStudent = await Student.create(newStudent)
      res.status(201).json({ message: "Student created", data: newStudent })
    } catch (error) {
      res.staut(400).json({message: "Student could not be created", data: error})
    }
  }



//export end
}
