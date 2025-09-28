import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [address, setAddress] = useState('');
  const [postLink, setPostLink] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Contoh contract faucet (alamat & ABI harus disesuaikan dengan faucet ZEN)
  const faucetContractAddress = "0xYourFaucetContractAddress";
  const faucetABI = [
    // Contoh ABI simplify, ganti dengan ABI faucet Anda
    "function drip(address recipient) public",
    "function dripWithBonus(address recipient, string memory postLink) public"
  ];

  // Connect Metamask wallet dan kirim permintaan faucet
  async function handleReceiveZTC() {
    if (!ethers.utils.isAddress(address)) {
      setMessage('Invalid address!');
      return;
    }

    try {
      setIsSending(true);
      setMessage('Waiting for wallet connection...');

      if (!window.ethereum) {
        setMessage('MetaMask not detected. Please install MetaMask extension.');
        setIsSending(false);
        return;
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const faucetContract = new ethers.Contract(faucetContractAddress, faucetABI, signer);

      let tx;
      if (postLink && postLink.trim() !== '') {
        setMessage('Sending drip with bonus...');
        tx = await faucetContract.dripWithBonus(address, postLink);
      } else {
        setMessage('Sending drip...');
        tx = await faucetContract.drip(address);
      }

      await tx.wait();
      setMessage('ZTC tokens were successfully sent!');

    } catch (error) {
      console.error(error);
      setMessage('Transaction failed or rejected.');
    } finally {
      setIsSending(false);
    }
  }

  // Fungsi untuk sharing ke X (Twitter) - opsional
  function shareOnX() {
    const tweet = encodeURIComponent('Double your drip at Zenchain Faucet! Get free ZTC tokens. #Zenchain');
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank');
  }

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Zenchain Testnet Faucet</h1>
      <p>Get Free ZTC Tokens and start building on the most secure Bitcoin Layer 1.</p>
      
      <div style={{ marginTop: 30 }}>
        <label>
          Zenchain Testnet Address:
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="0x..." 
            style={{ width: '100%', padding: 8, marginTop: 5, marginBottom: 15 }}
            disabled={isSending}
          />
        </label>

        <strong>Share On X To <span style={{ color: '#82c91e' }}>Double Your Drip!</span></strong> {' '}
        <button onClick={shareOnX} disabled={isSending}>Share on X</button>

        <label style={{ display: 'block', marginTop: 15 }}>
          Link to X Post (Optional bonus):
          <input
            type="text"
            value={postLink}
            onChange={(e) => setPostLink(e.target.value)}
            placeholder="https://x.com/..."
            style={{ width: '100%', padding: 8, marginTop: 5 }}
            disabled={isSending}
          />
        </label>

        <button 
          onClick={handleReceiveZTC} 
          disabled={isSending}
          style={{
            marginTop: 25,
            width: '100%',
            padding: '15px 0',
            backgroundColor: '#000',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            borderRadius: 8,
          }}
        >
          {isSending ? "Processing..." : "Receive ZTC"}
        </button>

        {message && (
          <p style={{ marginTop: 20, color: message.includes('success') ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
