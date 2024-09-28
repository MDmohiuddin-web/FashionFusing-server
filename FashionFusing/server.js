import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import clouding from './config/clouding.js';
import userRouter from './routes/UserRouts.js';
import productRouter from './routes/productRouts.js';




// app config   
const app = express();  
const port = process.env.PORT || 4000
// db config
connectDB();
clouding();

  



// middleware
app.use(cors());
app.use(express.json());
 
// api end points
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);  



// api routes or api end points
app.get('/', (req, res) => res.status(200).send('FashionFusing server is running'));

app.listen(port, () => console.log(`listening on localhost: ${port}`));