import path from 'path';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoute.js'
import orderRoutes from './routes/orderRoute.js'
import uploadRoutes from './routes/uploadRoute.js'


dotenv.config()

connectDB()

const app = express()
if(process.env.NODE_ENV === 'development')(
    app.use(morgan('dev'))
)

app.use(express.json({ extended: false}));


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
 res.send(process.env.PAYPAL_CLIENT_ID)
)

//make the upload folder static to be accessible from browser
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    
    app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}


app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 8001

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))