const express = require('express')
const app = express.Router();



app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/pages/index.html')
})
app.get('/contact', (req, res) => {
    res.status(200).sendFile(__dirname + '/pages/contact.html')
})

app.get('/about',(req,res)=>{
    res.status(200).sendFile(__dirname + '/pages/about.html')
})
app.get('/nav',(req,res)=>{
    res.status(200).sendFile(__dirname + '/pages/navbar.html')
})


module.exports = app;