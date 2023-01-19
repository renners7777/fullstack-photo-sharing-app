const express = require('express');
const app = new express();
app.use(express.static('public'));
const port = 8080;
app.listen(port, ()=>{
    console.log(`Serving photo app on http://localhost:${port}`)
})