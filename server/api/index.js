const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/results', require('./results'))
router.use('/sessions', require('./sessions'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
