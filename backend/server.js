// Load packages
const express = require('express');             // Express Package
const cors = require('cors');                   // Cors package
const mongoose = require('mongoose');           // Mongoose

// Load environmental configurations
require('dotenv').config();      // Config file



// Expressing app and defining port
const app = express();
const port = process.env.PORT || 5000;      // Port for Application


// Middleware Setup
app.use(express.json());            // Using express
app.use(cors());                    // Using cors

// Communication with the Database
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});

// Communicating with the Database (MongDb)
const uri = process.env.ATLAS_URI;
mongoose
    .connect(uri)
    .then(() => console.log("MongoDb connected"))
    .catch((err => console.log("Error: " + err)));


// Sucess message while connecting for the first time
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established sucessfully");
});

