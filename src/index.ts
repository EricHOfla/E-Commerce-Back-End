import express, {Express} from 'express'
import { PORT } from './screates'
import rootRouter from './routes'
import { PrismaClient } from '@prisma/client'


const app:Express = express()
app.use(express.json())

app.use('/', rootRouter);

export const prismaClient = new PrismaClient({
    log: ['query']
})

app.listen(PORT, () => {console.log("App working")})