import { serve } from '@hono/node-server'
import { Hono } from 'hono'

type Data = {
  id: number,
  title: string,
  year: number
}

let data: Data[] = [
  {id: 1, title: 'Book', year: 1996}, 
  {id: 2, title: 'Magazine', year: 2025}, 
  {id: 3, title: 'Article', year: 2020}
]

const app = new Hono()

app.get('/api/getData', (c) => {
  console.log('[/api/getData] called')
  return c.json(data)
})

app.post('/api/createItem', async (c) => {
  const body = await c.req.json<Omit<Data, 'id'>>()
  console.log('[/api/createitem] called with', body)
  data.push({id: data.length + 1, ...body})
  return c.json(data.at(-1))
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
