/* aplication routes */
const userRoute = require('./api/user/user.routes')
const studentRoute = require('./api/student/student.routes')
const teacherRoute = require('./api/teacher/teacher.routes')
const courseRoute = require('./api/course/course.routes')
const classRoute = require('./api/class/class.routes')

function routes(app) {
  app.use("/user", userRoute);
  app.use('/student', studentRoute); 
  app.use('/teacher', teacherRoute);
  app.use('/course', courseRoute);
  app.use('/class', classRoute);

}

 module.exports = routes;
