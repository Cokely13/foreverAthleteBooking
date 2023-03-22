const router = require('express').Router()
const { models: { Session, User}} = require('../db')


router.get('/', async (req, res, next) => {
  try {
    const sessions = await Session.findAll({include: User})
    res.json(sessions)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.id,{include: User}) ;
    res.json(session);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Session.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.id)
    res.send(await session.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.id);
    await session.destroy();
    res.send(session);
  } catch (error) {
    next(error);
  }
});


module.exports = router
