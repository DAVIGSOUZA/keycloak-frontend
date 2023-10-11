import express from "express"
import proxy from "express-http-proxy"

const app = express()

app.use('/admin', proxy('localhost:3001/admin'))

app.use('/', proxy('localhost:3000/'))

export default app