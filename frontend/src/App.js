import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ClientList from "./components/ClientList";
import ClientEdit from "./components/ClientEdit";
import ProductList from "./components/ProductList";
import ProductEdit from "./components/ProductEdit";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/edit/:id" element={<ClientEdit />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/edit/:id" element={<ProductEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
