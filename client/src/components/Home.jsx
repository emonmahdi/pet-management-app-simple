import React, { useEffect, useState } from "react";

const Home = () => {
  const [pets, setPets] = useState([]);

  // load pets
  useEffect(() => {
    const url = "http://localhost:5000/pets";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPets(data));
  }, []);

  const handleAddPet = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const type = e.target.type.value;
    const age = e.target.age.value;
    const pet = { name, type, age };

    fetch("http://localhost:5000/pets", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(pet),
    })
      .then((res) => res.json())
      .then((data) => {
        const newPets = [...pets, data];
        setPets(newPets);
        e.target.reset();
      });
  };

  // Delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/pets/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setPets(pets.filter((pet) => pet.id !== id));
      });
  };

  return (
    <div>
      <h2>Pets Lists</h2>
      <div className="add-form">
        <form
          onSubmit={handleAddPet}
          style={{
            maxWidth: "400px",
            margin: "20px auto",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "10px",
              fontSize: "20px",
              color: "#333",
            }}
          >
            Add a New Pet
          </h2>

          <input
            name="name"
            type="text"
            placeholder="🐾 Pet Name"
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <input
            name="type"
            type="text"
            placeholder="🐶 Pet Type (Dog/Cat)"
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <input
            name="age"
            type="number"
            placeholder="📅 Age"
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            ➕ Add Pet
          </button>
        </form>
      </div>

      {pets.length === 0 && <p>Pets are not available</p>}
      <div>
        {pets.map((pet) => (
          <div
            key={pet?.id}
            style={{ border: "1px solid gray", margin: "10px", padding: "5px" }}
          >
            <p>
              <strong>{pet.name}</strong> ({pet.type}) - {pet.age} years old
            </p>
            <div>
              <button
                style={{
                  backgroundColor: "#ffc107",
                  color: "#333",
                  padding: "5px 12px",
                  border: "none",
                  borderRadius: "4px",
                  marginRight: "8px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "5px 12px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(pet?.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
