import { handle } from 'hono/vercel'
import app from '../backend/src/app.js'

export const config = {
  maxDuration: 60,
}

export default handle(app)
