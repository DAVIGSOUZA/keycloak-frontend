import http from 'http'
import app from './app'

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer() {
  server.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))
}

startServer()
