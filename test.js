const express = require('express');
const PORT = process.removeListener.PORT || 3000;
const app = express();

app.use('/', require('./app.js'));

app.listen(PORT, ()=>{
    console.log("Hello from test.js");
})