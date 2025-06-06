import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import user_router from './routes/user.routes';
import event_router from './routes/event.routes';
import performance_router from './routes/performanceanalytic.routes';
import cors from 'cors'
import booking_router from './routes/booking.routes';
import path from 'path'; // Add this for path handling
import showperformance_router from './routes/showperformance.routes';


const app = express();

const allowedOrigins = ['http://localhost:4200' ];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Serve static files from an "images" folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware
app.use((req, res, next) => {
    console.log('Middleware hit:', req.method, req.url);
    console.log('Request URL:', req.url);
    console.log('Request Headers:', req.headers);
    next();
});

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

app.use('/users', user_router);
app.use('/jobs', event_router);
app.use('/performance', performance_router);
app.use('/performance', showperformance_router);
app.use('/bookings', booking_router)

app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    res.status(500).json({
        message: err.message
    })
})

const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
