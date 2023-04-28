import 'dotenv/config'
import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import router from './src/routes.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({
    origin: [
	    'http://localhost:3000',
        'http://localhost:5173'
    ]
}))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(router)

app.listen(process.env.PORT ?? 5000, () => {
    console.log(`Server on port: ${process.env.PORT ?? 5000}`)
})