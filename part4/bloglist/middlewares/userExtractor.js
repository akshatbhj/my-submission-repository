const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    try {
      const token = authorization.replace('Bearer ', '')
      const decodedToken = jwt.verify(token, process.env.SECRET)

      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }

      const user = await User.findById(decodedToken.id)
      if (!user) {
        return response.status(401).json({ error: 'user not found' })
      }

      request.user = user
    } catch (error) {
      return response.status(401).json({ error: 'token invalid or expired' })
    }
  } else {
    return response.status(401).json({ error: 'token missing' })
  }

  next()
}

module.exports = userExtractor
