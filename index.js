const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./user/router");
const loginRouter = require('./auth/router');
const eventRouter = require("./events/router");
const ticketRouter = require("./tickets/router");

const app = express();
const middleware = cors();
app.use(middleware);
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(loginRouter)
app.use(userRouter);
app.use(eventRouter)
app.use(ticketRouter)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on :${port}`));