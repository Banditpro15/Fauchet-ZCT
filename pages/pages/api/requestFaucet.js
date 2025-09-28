export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { address, xLink } = req.body;

  // Validasi dasar
  if (!address || !address.startsWith('0x') || address.length !== 42) {
    return res.status(400).json({ success: false, message: 'Invalid address' });
  }

  // Logika faucet bisa ditaruh di sini (call smart contract, RPC, dll)

  // Simulasi sukses
  return res.status(200).json({ success: true });
}
