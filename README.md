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
# Fauchet-ZCT
