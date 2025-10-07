const express = require('express')
const app = express();
const cors = require("cors");
const port = 5000;

app.use(express.json());
app.use(cors());

// demo data
let pets = [
    { id: 1, name: "Tommy", type: "Dog", age: 3 },
    { id: 2, name: "Kitty", type: "Cat", age: 2 }
  ];

app.get('/', (req, res) => {
    res.send("Pet Management Server");
});

// get all pet api
app.get('/pets', (req, res) => {
    res.send(pets)
})


app.listen(port, () => {
    console.log(`Server is Running Port ${port}`)
})