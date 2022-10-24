const Course = require('./course.model');
const User = require('../user/user.model');

const list = (req, res) => {
  Course.find()/* .populate({
    path: 'user',
    select: 'fullName email payment'
  }) */
  .then( courses => res.status(200).json({message: 'cursos ubicados exitosamente', data: courses}))
  .catch( err => res.status(200).json({message: 'no se pudo ubicar', data: err}))
}
//show a course by id
const show = async (req, res) => {
try {
  const { courseId } = req.params;
  const course = await Course.findById(courseId)/* .populate({
    path: 'user',
    select: 'fullName email payment'
  }) */
  res.status(200).json({message: 'curso ubicado exitosamente', data: course})
} catch (error) {
  res.status(200).json({message: 'no se pudo ubicar el curso', data: error})
}

}

const create = async (req, res) => {
  try {
    const user = await User.findById(req.user)
    const data = req.body;
    if(!user) throw new Error('No existe Usuario');
    const newCourse = {
      ...data,
      courseOwner: user._id
    }
    const course = await Course.create(newCourse);
    user.teacherCourses.unshift(course);
    await user.save({ validateBeforeSave: false })

    res.status(201).json({message: 'Curso creado exitosamente', data: course})
  } catch (err) {
    res.status(400).json({message: 'No se pudo crear el curso', data: err})
  }
}

const update = (req, res) => {
  const { courseId } = req.params;

  Course.findByIdAndUpdate(courseId, req.body, {new: true})
    .then( course => res.status(200).json({message: 'curso modificado exitosamente', data: course}))
    .catch( err => res.status(400).json({message: 'no se pudo modificar', data: err}))
}

const destroy = (req, res) => {
  const { courseId } = req.params;

  Course.findByIdAndRemove(courseId)
    .then( course => res.status(200).json({message: 'curso eliminado exitosamente', data: course}))
    .catch( err => res.status(400).json({message: 'no se pudo eliminar', data: err}))
}

module.exports = {
  //course CRUD
  create,
  show, list,
  update,
  destroy

}
