document.getElementById('certifyForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const name = document.getElementById('docName').value;
  const university = document.getElementById('docUniversity').value;
  const title = document.getElementById('docTitle').value;
  const ipk = document.getElementById('docIPK').value;
  const file = document.getElementById('docFile').files[0];

  if (!file) {
    alert("Silakan pilih file PDF.");
    return;
  }

  // Upload file ke IPFS via Pinata
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`, // ganti dengan JWT kamu
      },
      body: formData,
    });

    const result = await res.json();
    const fileCID = result.IpfsHash;

    const jsonData = {
      nama: name,
      universitas: university,
      judul: title,
      ipk: ipk,
      fileCID: fileCID,
    };

    alert("✅ Data berhasil dikirim dan file diunggah ke IPFS.\nCID: " + fileCID);
    console.log("Data JSON:", jsonData);
    
    // (Opsional) Upload jsonData juga ke IPFS jika ingin menyimpan semua data dalam 1 objek

  } catch (err) {
    console.error("❌ Gagal upload ke IPFS:", err);
    alert("Upload ke IPFS gagal.");
  }
});
