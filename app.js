const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;


//middlewares
app.use(cors());
app.use(express.json()); 

require("./src/connection");

app.use( require('./routes') );

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});
