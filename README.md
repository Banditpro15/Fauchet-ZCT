import React, { useState } from "react";

const ZenchainFaucet = () => {
  const [address, setAddress] = useState("");
  const [xPostLink, setXPostLink] = useState("");
  const [isShared, setIsShared] = useState(false);

  const handleShareOnX = () => {
    // Implement the sharing logic here
    // For demo, we just toggle shared state
    alert("Shared on X! Your drip will be doubled.");
    setIsShared(true);
  };

  const handleReceiveZTC = () => {
    // Add your faucet API call or logic to send ZTC tokens
    if (!address) {
      alert("Please enter your Zenchain Testnet Address.");
      return;
    }

    alert(`ZTC tokens sent to: ${address}\nX Post Link: ${xPostLink ? xPostLink : "None"}`);
    // Clear inputs or keep as needed
  };

  return (
    <div style={styles.container}>
      <h2>
        ZTC <span style={{ color: "#7CFC00" }}>Faucet</span>
      </h2>
      <label>
        Zenchain Testnet Address
        <input
          type="text"
          placeholder="0x..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.input}
        />
      </label>

      <div style={{ marginBottom: 12, marginTop: 8 }}>
        <b>
          Share On X To <span style={{ color: "#7CFC00" }}>Double Your Drip!</span>
        </b>
        <button onClick={handleShareOnX} style={styles.shareButton}>
          Share on X
        </button>
      </div>

      <label>
        Link to X Post <small>(Optional bonus)</small>
        <input
          type="url"
          placeholder="https://x.com/..."
          value={xPostLink}
          onChange={(e) => setXPostLink(e.target.value)}
          style={styles.input}
        />
      </label>

      <button onClick={handleReceiveZTC} style={styles.receiveButton}>
        Receive ZTC
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    maxWidth: 400,
    margin: "30px auto",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
  },
  input: {
    display: "block",
    width: "100%",
    padding: 10,
    marginTop: 6,
    marginBottom: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: "#a8cf45",
    border: "none",
    padding: "10px 18px",
    marginLeft: 12,
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
    color: "#222",
  },
  receiveButton: {
    backgroundColor: "#000",
    color: "#fff",
    width: "100%",
    padding: 14,
    fontSize: 16,
    borderRadius: 24,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ZenchainFaucet;
