import express from 'express'
import path from 'path'
import expressHandlebars from 'express-handlebars'
import morgan from 'morgan'

import WebRoute from './Route/web'

const App: express.Application = express()

App.use(morgan('combined'))

App.use(express.json())
App.use(express.urlencoded({ extended: true }))

App.use(express.static(path.join(process.cwd(), 'public')))

App.set('views', path.join(process.cwd(),'views'))

App.engine('html', expressHandlebars({
  extname: 'html',
  layoutsDir: path.join(App.get('views'), 'layouts'),
  defaultLayout: 'base'
}))

App.set('view engine', 'html')

App.use('/', WebRoute)

export default App
