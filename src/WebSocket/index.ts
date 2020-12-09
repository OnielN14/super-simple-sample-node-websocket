import ws from 'ws'
import http from 'http'
import url from 'url'
import { v4 as UUIDv4 } from 'uuid'
import Logger from '../utilities/Logger'

export default function socketInitialization (httpServer: http.Server, path: string = '/'): ws.Server {
  const socketApp = new ws.Server({
    noServer: true, path
  })

  socketApp.on('connection', (socketConnection) => {
    const sessionId = UUIDv4()
    Logger.info(`New Connection : ${sessionId}`)

    socketConnection.on('error', (error) => {
      Logger.error(`Connection ${sessionId} Error`)
      console.error(error)
    })

    socketConnection.on('close', () => {
      Logger.info(`Connection Close : ${sessionId}`)
    })

    socketConnection.on('message', (payload) => {
      socketConnection.send(JSON.stringify({
        message: 'Payload Received. Re-send To Client',
        data: payload
      }))
    })
  })

  httpServer.on('upgrade', (request, socket, header) => {
    const pathname = url.parse(request.url).pathname

    Logger.info(`Accessing ${pathname || '/'}`)

    socketApp.handleUpgrade(request, socket, header, (serverSocketConnection) => {
      socketApp.emit('connection', serverSocketConnection, request)
    })
  })

  return socketApp
}
