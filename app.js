const express = require('express')
const fs = require('fs')
const PORT = process.env.PORT || 3000;
const app = express();
const data = fs.readFileSync('./pages/index.html')



app.get('/', (req, res) => {
    console.log(__dirname);
    // res.status(200).send(data.toString())
    res.status(200).sendFile(__dirname + '/pages/index.html')
})
app.get('/contact', (req, res) => {
    // res.status(200).send(data.toString())
    res.status(200).sendFile(__dirname + '/pages/contact.html')
})

app.get('/about',(req,res)=>{
    res.status(200).sendFile(__dirname + '/pages/about.html')
})
app.get('/nav',(req,res)=>{
    res.status(200).sendFile(__dirname + '/pages/navbar.html')
})

app.listen(PORT, () => {
    console.log(`Your app is listening on ${PORT}`);
});