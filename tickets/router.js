const { Router } = require('express')
const Ticket = require('./model')

const router = new Router()

router.post('/tickets', (req, res, next) => {
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
})

router.get('/tickets/:eventId', async (req, res, next) => {
  const tickets = await Ticket.findAll({ where: { eventId: req.params.eventId } })
    .then(tickets => res.send(tickets))
    .catch(console.log(next))
})

module.exports = router