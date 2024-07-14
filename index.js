import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose';
import cors from 'cors';

import { 
    getHealth, 
    postPlant, 
    getPlants, 
    getPlantID, 
    putPlantID, 
    deletePlantID, 
    handlePageNotFound 
} from './controllers/plant.js';

const app = express()
app.use(cors())
app.use(express.json())

const dbConnection = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL)

    if(conn){
        console.log("MongoDB Connected 📦")
    }
    else{
        console.log("MongoDB Not Connected")
    }
}
dbConnection();

const PORT = process.env.PORT;

app.get('/health', getHealth)

app.post('/plant', postPlant)

app.get('/plants', getPlants)

app.get('/plant/:id', getPlantID)

app.put("/plant/:id", putPlantID)

app.delete('/plant/:id', deletePlantID)

app.use("*", handlePageNotFound)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})