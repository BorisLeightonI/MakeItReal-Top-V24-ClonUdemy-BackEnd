const Course = require("./course.model");
const User = require("../user/user.model");

const list = (req, res) => {
  Course.find() /* .populate({
    path: 'user',
    select: 'fullName email payment'
  }) */
    .then((courses) =>
      res
        .status(200)
        .json({ message: "cursos ubicados exitosamente", data: courses })
    )
    .catch((err) =>
      res.status(200).json({ message: "no se pudo ubicar", data: err })
    );
};

//show a course by id
const show = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user;
    const course = await Course.findById(courseId);
    console.log('user id ' , userId,'courseId', courseId)

    if (course.courseOwner.toString() !== userId) {
      throw new Error("Course not found ,,");
    }

    res
      .status(200)
      .json({ message: "✅ Course found :", data: course });
  } catch (error) {
    res
      .status(200)
      .json({ message: "no se pudo ubicar el curso", data: error });
  }
};

/*create a course*/
const create = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const data = req.body;
    if (!user) throw new Error("No existe Usuario");
    const newCourse = {
      ...data,
      courseOwner: user._id,
    };
    const course = await Course.create(newCourse);
    user.teacherCourses.unshift(course);
    await user.save({ validateBeforeSave: false });

    res
      .status(201)
      .json({ message: "Curso creado exitosamente", data: course });
  } catch (err) {
    res.status(400).json({ message: "No se pudo crear el curso", data: err });
  }
};

const update = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user;
    const currentCourse = await Course.findById(courseId);

    if (currentCourse.courseOwner.toString() !== userId) {
      throw new Error("Course not found");
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {new: true});

    res.status(200).json({ message: "✅ Course updated succesfull", data: updatedCourse });
  } catch (error) {
    res.status(400).json({ message: "❌ Course could NOT be updated", data: error.message });
  }
};



const destroy = (req, res) => {
  const { courseId } = req.params;

  Course.findByIdAndRemove(courseId)
    .then((course) =>
      res
        .status(200)
        .json({ message: "curso eliminado exitosamente", data: course })
    )
    .catch((err) =>
      res.status(400).json({ message: "no se pudo eliminar", data: err })
    );
};

module.exports = {
  create,
  show,
  list,
  update,
  destroy,
};
