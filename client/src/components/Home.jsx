import React, { useEffect, useState } from "react";

const Home = () => {
  const [pets, setPets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", type: "", age: "" });

  // load pets
  useEffect(() => {
    const url = "http://localhost:5000/pets";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((err) => console.error("Failed to load pets:", err));
  }, []);

  const handleAddPet = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const type = e.target.type.value;
    const age = parseInt(e.target.age.value, 10) || 0;
    const pet = { name, type, age };

    fetch("http://localhost:5000/pets", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(pet),
    })
      .then((res) => res.json())
      .then((data) => {
        // use functional update to avoid stale state
        setPets((prev) => [...prev, data]);
        e.target.reset();
      })
      .catch((err) => console.error("Add pet failed:", err));
  };

  // Delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/pets/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setPets((prev) => prev.filter((pet) => pet.id !== id));
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  // Enable edit mode
  const handleEdit = (pet) => {
    setEditingId(pet.id);
    // ensure age is a string for controlled input (or keep number, both ok)
    setEditData({ name: pet.name, type: pet.type, age: String(pet.age) });
  };

  // Handle inline input change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Update
  const handleUpdate = (id) => {
    // prepare payload (convert age to number)
    const payload = {
      name: editData.name,
      type: editData.type,
      age: parseInt(editData.age, 10) || 0,
    };

    fetch(`http://localhost:5000/pets/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        // Handle both possible server responses:
        // 1) server returns updated pet object directly
        // 2) server returns { message, updatedPet }
        const updated =
          response && response.updatedPet ? response.updatedPet : response;

        // If server returns a wrapper (like {message, updatedPet}), extract it.
        // Now update local state with functional updater:
        setPets((prev) => prev.map((p) => (p.id === id ? updated : p)));

        // exit edit mode and reset editData
        setEditingId(null);
        setEditData({ name: "", type: "", age: "" });
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
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
          <h2 style={{ textAlign: "center", marginBottom: 10 }}>
            Add a New Pet
          </h2>

          <input name="name" type="text" placeholder="🐾 Pet Name" required />
          <input
            name="type"
            type="text"
            placeholder="🐶 Pet Type (Dog/Cat)"
            required
          />
          <input name="age" type="number" placeholder="📅 Age" required />

          <button
            type="submit"
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
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
            style={{ border: "1px solid gray", margin: 10, padding: 8 }}
          >
            {editingId === pet.id ? (
              <>
                <input
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  style={{ marginRight: 5 }}
                />
                <input
                  name="type"
                  value={editData.type}
                  onChange={handleChange}
                  placeholder="Type"
                  style={{ marginRight: 5 }}
                />
                <input
                  name="age"
                  type="number"
                  value={editData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  style={{ marginRight: 5 }}
                />
                <button
                  onClick={() => handleUpdate(pet.id)}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: 4,
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditData({ name: "", type: "", age: "" });
                  }}
                  style={{
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    marginLeft: 5,
                    borderRadius: 4,
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p>
                  <strong>{pet.name}</strong> ({pet.type}) – {pet.age} years old
                </p>
                <button
                  onClick={() => handleEdit(pet)}
                  style={{
                    backgroundColor: "#ffc107",
                    color: "#333",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: 4,
                    marginRight: 5,
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pet.id)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: 4,
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
