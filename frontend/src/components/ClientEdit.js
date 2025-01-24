import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ClientEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState({ name: '', email: '' });

  useEffect(() => {
    if (id !== 'new') {
      // Replace this URL with your Spring Boot backend API endpoint
      fetch(`"http://localhost:8080/clients"${id}`)
        .then((response) => response.json())
        .then((data) => setClient(data))
        .catch((error) => console.error('Error fetching client:', error));
    }
  }, [id]);

  const handleSave = () => {
    const method = id === 'new' ? 'POST' : 'PUT';
    const url = id === 'new' ? 'http://localhost:8080/clients' : `http://localhost:8080/clients/${id}`;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    })
      .then(() => navigate('/clients'))
      .catch((error) => console.error('Error saving client:', error));
  };

  return (
    <div className="client-edit">
      <h2>{id === 'new' ? 'Add Client' : 'Edit Client'}</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={client.name}
            onChange={(e) => setClient({ ...client, name: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={client.email}
            onChange={(e) => setClient({ ...client, email: e.target.value })}
          />
        </label>
        <div className="form-actions">
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientEdit;
