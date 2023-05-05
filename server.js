require('dotenv').config()

const express= require('express');
const app=express()
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });

app.use(express.json());

const SubscriberRouter=require('./Routes/Subscribers');
app.use('/Subscribers', SubscriberRouter)

app.listen(3000, ()=>
    console.log("Server Started")
)