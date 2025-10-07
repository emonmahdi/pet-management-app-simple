const express = require('express')
const app = express();
const cors = require("cors");
const port = 5000;

app.use(express.json());
app.use(cors());

// demo data
let pets = [
  { id: 1, name: "Tommy", type: "Dog", age: 3 },
  { id: 2, name: "Kitty", type: "Cat", age: 2 },
  { id: 3, name: "Tommy 2", type: "Dog", age: 2 },
];

app.get("/", (req, res) => {
  res.send("Pet Management Server");
});

// get all pet api
app.get("/pets", (req, res) => {
  res.send(pets);
});

//add pet api
app.post("/pets", (req, res) => {
  const newPets = req.body;
  newPets.id = pets.length + 1;
  pets.push(newPets);
  res.send(newPets);
});

// delete api
app.delete("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pets = pets.filter((pet) => pet.id !== id);
  res.send({ message: "Pet deleted successfully", id });
});

//update api
app.put("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body; // name,type,age
  pets = pets.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
  const updatedPet = pets.find((p) => p.id === id);
  res.send(updatedPet);
});

app.listen(port, () => {
    console.log(`Server is Running Port ${port}`)
})