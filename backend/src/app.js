import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/temp'));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js"

// routes declaration
app.use('/api/v1/auth', userRouter)
app.use('/api/v1', messageRouter)

export { app };