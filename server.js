import express from "express";
import dotenv from "dotenv";
import contactRouter from "./routes/contactRoutes.js"
import errorHandle from "./middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";
import userRouter from "./routes/userRoutes.js"

dotenv.config();
connectDb();

const port = process.env.PORT || 3002;
const app = express();

// Parse data come from client
app.use(express.json());

// Handle router
app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);

// If we don't want get error in html form
app.use(errorHandle);

app.listen(port, () => {
    console.log(`Server is listen on port: ${port}`)
});


