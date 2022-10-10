/* aplication routes */
const userRoute = require('./api/user/user.routes')
const instructorRoute = require('./api/instructor/instructor.routes')
const courseRoute = require('./api/course/course.routes')
const classRoute = require('./api/class/class.routes')
const mediaRoute = require('./api/multimedia/media.routes');

function routes(app) {
  app.use('/user', userRoute);
  app.use('/instructor', instructorRoute);
  app.use('/course', courseRoute);
  app.use('/class', classRoute)
  app.use(mediaRoute);
};


 module.exports = routes;
