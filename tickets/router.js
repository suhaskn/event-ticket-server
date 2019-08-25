const { Router } = require('express')
const Ticket = require('./model')
const auth = require('../auth/middleware')
const dateFormat = require('dateformat')

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


router.get('/ticket/:id', async (req, res, next) => {

  const response = {}
  const ticket = await Ticket.findByPk( req.params.id )
  .then( async ticket =>{ 

    const tickets = await Ticket.findAll({ where: { eventId: ticket.eventId } })
    const ticketPriceOfAllTickets = tickets.map(ticket => ticket.price)
    const averageTicketPrice =  ticketPriceOfAllTickets.
    reduce((accumulator, current) =>accumulator + current) / ticketPriceOfAllTickets.length
    let diffInPerc = (((averageTicketPrice - ticket.price) / averageTicketPrice) * 100)
    let ticketRisk = 0
    if (ticket.price < averageTicketPrice) {
        ticketRisk += diffInPerc;
    }
    else {
      if ((diffInPerc * -1) < 10) {
        ticketRisk -= (diffInPerc * -1);
      } else {
        ticketRisk -= 10;
      }
    }
    const createdTime = dateFormat(ticket.createdAt, "H")
    ticketRisk = createdTime >= 9 && createdTime <= 17 ? ticketRisk - 10.0 : ticketRisk + 10.0
    ticketRisk = ticketRisk.toFixed(2)
    if (ticketRisk < 5) {
      ticketRisk = 5
    }
    else if (ticketRisk > 95) {
      ticketRisk = 95
    }
    response.ticket = ticket,
    response.ticketRisk = ticketRisk
    console.log('res',response)
    res.send(response)})
  .catch(console.log(next))  
})

module.exports = router