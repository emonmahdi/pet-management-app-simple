const express = require('express')
const app = express();
const port = 5000;


app.get('/', (req, res) => {
    console.log('Pet Management Server')
});


app.listen(port, () => {
    console.log(`Server is Running Port ${port}`)
})