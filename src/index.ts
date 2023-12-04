import express, { Express, Router } from 'express'
import { routes } from './router/routes'
import * as dotenv from 'dotenv'
dotenv.config({ path: './.env' })


const app: Express = express()

app.use(express.json())
app.use(routes)

app.listen(process.env.PORT, () => {
    console.log(`Servidor aberto na porta ${process.env.PORT}`);
})