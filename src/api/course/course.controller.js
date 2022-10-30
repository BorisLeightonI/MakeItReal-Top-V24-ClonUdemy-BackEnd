const Course = require("./course.model");
const User = require("../user/user.model");

const listAllCourses = (req, res) => {

  Course.find()
    .then((courses) =>
      res
        .status(200)
        .json({ message: "cursos encontrados exitosamente", data: courses })
    )
    .catch((err) =>
      res.status(400).json({ message: "no se pudo ubicar", data: err })
    );
};

//show a course by id
const show = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user;
    console.log('show controller in course','user id:' , userId,'courseId:', courseId )
    const course = await Course.findById(courseId).populate('classes', '_id classTitle classDescription classVideo classIsActive');
    console.log('course owner:', course.courseStudents[0])
    console.log('course controler', course)
    console.log(course.courseStudents[0].toString()!==userId)
/*     if (course.courseOwner.toString() !== userId) {
      throw new Error("Course not found (no match user id and owner id)");
    } */

    res
      .status(200)
      .json({ message: "✅ Course found :", data: course });
  } catch (error) {
    res
      .status(404)
      .json({ message: "no se pudo ubicar el curso", data: error.message });
  }
};
//show a course by id without auth

{/*const showNoAuth = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate('classes', '_id classTitle classDescription classVideo classIsActive');
          console.log('course controler', course)
    if (course.courseOwner.toString() !== userId) {
      throw new Error("Course not found (no match user id and owner id)");
    }

    res
      .status(200)
      .json({ message: "✅ Course found :", data: course });
  } catch (error) {
    res
      .status(404)
      .json({ message: "no se pudo ubicar el curso", data: error.message });
  }
};*/}

const listUserCourses = async (req, res) => {//////////////////////////////////////
  try {
    const userId = req.user;
    const courses = await Course.find({courseStudents: userId});

    // const user = await User.findById(userId)
    // const userCourses = user.studentCourses // arreglo de los id de los cursos suscritos
    // console.log('userCourses', userCourses)
    // let  myCourses = []// deberia ser arreglo de objetos con llaves del curso
    // userCourses.map( (item) => {
    //  Course.findById(item).then(course => {
    //   myCourses.push(course)
    // })
    // })
    console.log('My Courses:', courses);
    res.status(200).json({ message: ":white_check_mark: User courses found :", data: courses });
  } catch (error) {
    res
      .status(404)
      .json({ message: ":x: User courses NOT found ", data: error.message });
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

const createUserCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const data = req.body;
    if (!user) throw new Error("No existe Usuario");
    const newCourse = {
      ...data,
      // courseStudents: user._id,
    };
    const course = await Course.create(newCourse);
    course.courseStudents.push(user._id)
    await course.save();
    user.studentCourses.push(course);
    await user.save();

    res
      .status(201)
      .json({ message: "Curso creado exitosamente", data: course });
  } catch (err) {
    res.status(400).json({ message: "No se pudo crear el curso", data: err.message });
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
  create, createUserCourses,
  show,
  listAllCourses, listUserCourses,
  update,
  destroy,
};
