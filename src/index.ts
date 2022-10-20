import dotenv from 'dotenv'
import app from './app'
import './database/config'

dotenv.config()

const main = () => {
  app.listen(app.get('port'))
  console.log('Server on port', app.get('port'))
}

main()
