const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
//Setting up middleware
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());



//Establish database connection 
const uri = process.env.ATLAS_URI;

console.log(uri);

mongoose.connect(uri,{useNewUrlParser:true});



const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
}
)


//settingup Router

const userRouter = require('./routes/users');
const exerciseRouter = require('./routes/exercises');

app.use('/exercises',exerciseRouter);
app.use('/users',userRouter);


app.listen(port,()=>{
console.log(`Server is listening on ${port}....`);
})

