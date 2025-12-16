import express from 'express'
import dotenv from 'dotenv'
//import cors from 'cors' (Use cors only if running in local environment)

import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from './lib/db.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || /^https:\/\/.*\.github\.dev$/.test(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// }));


//app.use(cors())

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on Port ${PORT}`)
    connectDB()
})

