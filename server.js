import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'cookie-session'
import bodyParser from 'body-parser'
import path from 'path'
import http from 'http'

import routes from './src/routes'
import responseLogger from './src/logger/logger'

const port = 3000
const app = express()

app.use(helmet())
app.disable('x-powered-by')

// Enable All CORS Requests
app.use(cors())

const sessionOption = {
    secret: 'react and redux rule!!!!',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }

app.use(session(sessionOption))

app.use(responseLogger(true))

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: true })) // Parses urlencoded bodies
app.use(bodyParser.json()) // Send JSON responses
// app.use(cookieParser(project.auth_cookie_secret))
app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, '/src/public')));

// router
routes(app)

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof port === 'string'
      ? `Pipe ${port}`
      : `Port ${port}`

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`)
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`)
        process.exit(1)
        break
      default:
        throw error
    }
  }

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
    const addr = server.address()
    const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`
    console.log(`Server is listening on port ${port}-${bind}. Running version 1.0`)
  }


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

export default server
