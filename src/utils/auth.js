const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try {
    // in postman  use Authorization capital A front upper case back lower case
    const { authorization } = req.headers

    //if header comes in
    if(!authorization){
      throw new Error("session expired auth")
    }

    //separate <bearer> from token
    const [ ,token] = authorization.split(' ')

    //if there is a token
    if(!token){
      throw new Error('session expired token')
    }
    //token verification
  const { id } = jwt.verify(token, process.env.SECRET_KEY_JWT)
  req.student = id

  next()
  } catch (error) {
    res.status(401).json({ message: error.message})
  }
}
