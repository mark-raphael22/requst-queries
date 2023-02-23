require('dotenv').config();
const express = require('express');
const app = express();
const port=process.env.PORT || 9000;
const mongoose=require('mongoose');
const notfoundroute=require('./middleware/notfoundroute')
const cors=require('cors');


const teamRouter= require("./routes/teamRouter")

//middleware
app.use(cors());
app.use(express.json());
app.use(teamRouter);

mongoose.set("strictQuery",true);

//notfoundroute
app.use(notfoundroute)


const Startserver  = async (req, res) => {

    try {
        await mongoose.connect(process.env.MON_URI)
        app.listen(port,()=>{
            console.log(`server running on port ${port}`);
        }) 
    } catch (error) {
        
    }

}
Startserver();