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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MjQyOWQ5Ni0zYWVhLTQ2ZjQtYjA2YS1kMGM5NjU5ZjI5MDIiLCJlbWFpbCI6Im1hemlkYWJkdWxheml6MTRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImU3MDc5MTgwZDFlZThkZTlmZDFkIiwic2NvcGVkS2V5U2VjcmV0IjoiY2ZjMmZiODI3OTUzNTA4Mjg0ZjNhNWFlYmZhNTI4YmJkMGE1MTMzMTNhN2I0MDdmNzZkMTllYmI2YjQxMGJlZiIsImV4cCI6MTc4MTI1MjIyNH0.Xhyk8UgiEVMUcwAu_5OJIb_oTUb3DKiDJVX7Vt48iyY`, // ganti dengan JWT kamu
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
