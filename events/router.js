const { Router } = require('express')
const Event = require('./model')

const router = new Router()

router.post('/events', (req, res, next) => {
  const event = {
    name: req.body.name,
    description: req.body.description,
    picture: req.body.picture, 
    startDate: req.body.startDate,
    endDate: req.body.endDate
  }

  Event.create(event)
    .then(eventList => {
      return res.send(eventList)
    })
})

router.get('/events', async(req,res) => {
  const limit = req.query.limit || 9
  const offset = req.query.offset || 0
  
    const events = await Event.findAll({
    limit, offset
  })
  .then(events => {
    res.send(events)
  })
  .catch(error => next(error))
})

module.exports = router