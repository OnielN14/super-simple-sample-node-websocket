import { Router } from 'express'

const WebRoute = Router()

WebRoute.all('/', (req, res) => {
  res.render('index')
})

export default WebRoute