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

  return (
    <div>
      <h2>Pets Lists</h2>
      <button
        style={{
          backgroundColor: "#28a745",
          color: "white",
          padding: "8px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
        onClick={() => alert("Add Pet button clicked!")}
      >
        Add Pet
      </button>
      {pets.length === 0 && <p>Pets are not available</p>}
      <div>
        {pets.map((pet) => (
          <div
            key={pet.id}
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
