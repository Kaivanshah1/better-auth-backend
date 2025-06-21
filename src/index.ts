import { Hono } from 'hono'
import { auth } from './lib/auth'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

const app = new Hono()

// Apply CORS middleware first, before any routes
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.use('*', logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Handle auth routes
app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export default app
