const { Router } = require('express')
const Ticket = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.post('/tickets', auth, (req, res, next) => {
  const ticket = {
    ticketPicture: req.body.ticketPicture,
    price: req.body.price,
    description: req.body.description,
    eventId: req.body.eventId
  }

  Ticket.create(ticket)
  .then(ticketList => {
      return res.send(ticketList)
    })
    .catch(err=>console.log('error',err))
})

router.get('/tickets/:eventId', async (req, res, next) => {
  const tickets = await Ticket.findAll({ where: { eventId: req.params.eventId } })
    .then(tickets => res.send(tickets))
    .catch(console.log(next))
})

module.exports = router