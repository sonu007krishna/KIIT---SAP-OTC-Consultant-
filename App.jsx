import React, { useState } from "react";

export default function App() {
  const [vendors, setVendors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [orders, setOrders] = useState([]);
  const [popup, setPopup] = useState("");

  const [vendor, setVendor] = useState("");
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const showPopup = (msg) => {
    setPopup(msg);
    setTimeout(() => setPopup(""), 2000);
  };

  const addVendor = () => {
    if (!vendor) return;
    setVendors([...vendors, vendor]);
    setVendor("");
    showPopup("Vendor Added");
  };

  const addMaterial = () => {
    if (!material || !price) return;
    setMaterials([...materials, { name: material, price }]);
    setMaterial("");
    setPrice("");
    showPopup("Material Added");
  };

  const createPO = () => {
    if (!selectedVendor || !selectedMaterial) return;

    const mat = materials.find((m) => m.name === selectedMaterial);

    const newOrder = {
      id: Date.now(),
      po: "PO-" + Date.now().toString().slice(-5),
      vendor: selectedVendor,
      material: selectedMaterial,
      total: mat.price,
      status: "Pending",
    };

    setOrders([newOrder, ...orders]);
    showPopup("PO Created");
  };

  const updateStatus = (id) => {
    setOrders(
      orders.map((o) =>
        o.id === id ? { ...o, status: "Completed" } : o
      )
    );
    showPopup("Status Updated");
  };

  const styles = {
    app: {
      minHeight: "100vh",
      background: "#0f172a",
      color: "#fff",
      display: "flex",
      fontFamily: "Arial",
    },
    sidebar: {
      width: "240px",
      background: "#111827",
      padding: "25px",
    },
    logo: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "30px",
      color: "#38bdf8",
    },
    menu: {
      marginBottom: "15px",
      padding: "12px",
      background: "#1e293b",
      borderRadius: "10px",
      cursor: "pointer",
    },
    content: {
      flex: 1,
      padding: "30px",
    },
    header: {
      fontSize: "34px",
      marginBottom: "25px",
      fontWeight: "700",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
      gap: "20px",
    },
    card: {
      background: "#1e293b",
      padding: "20px",
      borderRadius: "18px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      borderRadius: "10px",
      border: "none",
      outline: "none",
    },
    button: (bg) => ({
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      color: "#fff",
      fontWeight: "600",
      background: bg,
    }),
    table: {
      marginTop: "25px",
      background: "#1e293b",
      padding: "20px",
      borderRadius: "18px",
    },
    row: {
      padding: "14px",
      marginTop: "10px",
      borderRadius: "12px",
      background: "#334155",
    },
    popup: {
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "#22c55e",
      padding: "12px 18px",
      borderRadius: "10px",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.app}>
      {popup && <div style={styles.popup}>{popup}</div>}

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>SAP P2P</div>
        <div style={styles.menu}>Dashboard</div>
        <div style={styles.menu}>Vendors</div>
        <div style={styles.menu}>Materials</div>
        <div style={styles.menu}>Purchase Orders</div>
        <div style={styles.menu}>Payments</div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.header}>Procure-to-Pay Management</h1>

        <div style={styles.grid}>
          {/* Vendor */}
          <div style={styles.card}>
            <h2>Add Vendor</h2>
            <input
              style={styles.input}
              placeholder="Vendor Name"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
            />
            <button
              style={styles.button("linear-gradient(135deg,#3b82f6,#06b6d4)")}
              onClick={addVendor}
            >
              Save Vendor
            </button>
          </div>

          {/* Material */}
          <div style={styles.card}>
            <h2>Add Material</h2>
            <input
              style={styles.input}
              placeholder="Material Name"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button
              style={styles.button("linear-gradient(135deg,#10b981,#059669)")}
              onClick={addMaterial}
            >
              Save Material
            </button>
          </div>

          {/* PO */}
          <div style={styles.card}>
            <h2>Create Purchase Order</h2>

            <select
              style={styles.input}
              onChange={(e) => setSelectedVendor(e.target.value)}
            >
              <option>Select Vendor</option>
              {vendors.map((v, i) => (
                <option key={i}>{v}</option>
              ))}
            </select>

            <select
              style={styles.input}
              onChange={(e) => setSelectedMaterial(e.target.value)}
            >
              <option>Select Material</option>
              {materials.map((m, i) => (
                <option key={i}>{m.name}</option>
              ))}
            </select>

            <button
              style={styles.button("linear-gradient(135deg,#f59e0b,#ef4444)")}
              onClick={createPO}
            >
              Create PO
            </button>
          </div>
        </div>

        {/* Orders */}
        <div style={styles.table}>
          <h2>Purchase Orders</h2>

          {orders.map((o) => (
            <div key={o.id} style={styles.row}>
              <strong>{o.po}</strong>
              <p>Vendor: {o.vendor}</p>
              <p>Material: {o.material}</p>
              <p>Total: ₹{o.total}</p>
              <p>Status: {o.status}</p>

              {o.status === "Pending" && (
                <button
                  style={{
                    ...styles.button(
                      "linear-gradient(135deg,#8b5cf6,#6366f1)"
                    ),
                    marginTop: "10px",
                  }}
                  onClick={() => updateStatus(o.id)}
                >
                  Complete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
