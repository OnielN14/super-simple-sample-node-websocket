import http from 'http'
import App from './ExpressApp'
import SocketAppInit from './WebSocket'
import Logger from './utilities/Logger'

const PORT = process.env.PORT || 6070
const server = http.createServer(App)

SocketAppInit(server, '/')

server.listen(PORT, () => {
  Logger.info(`Server listen on ${PORT}`)  
})
