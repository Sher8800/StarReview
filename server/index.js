import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoute from './routes/userRoute.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 4000
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD

app.use(cors())
app.use(express.json())

app.use(userRoute)

const start = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@usercluster.mcnqw.mongodb.net/?retryWrites=true&w=majority&appName=UserCluster`
        )

        app.listen(PORT, () => {
            console.log(`Server started on port: http://localhost:${PORT}`);

        })
    } catch (error) {
        console.log(error);
    }
}

start()
