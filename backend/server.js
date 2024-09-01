import express from 'express';
import uploadRoute from './routes/uploadRoute';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import { connectToDB } from './dbconnect/data_base.js';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';  
import categoryRoute from './routes/categoryRoutes.js'
import cors from 'cors';

dotenv.config();

connectToDB();

const app = express();

app.use(cors());
app.use(express.json()); 


app.use(bodyParser.json());
app.use('/api/uploads', uploadRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute); 
app.use("/api/orders", orderRoute);
app.use("/api/category",categoryRoute);
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.listen(5000,()=>{
    console.log("Server has started ");
})