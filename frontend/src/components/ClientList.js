import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function ClientList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Replace this URL with your Spring Boot backend API endpoint
    fetch('http://localhost:8080/clients')
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error('Error fetching clients:', error));
  }, []);

  return (
    <div className="client-list">
      <h2>Clients</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>
                <Link to={`/edit/${client.id}`} className="edit-btn">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;
