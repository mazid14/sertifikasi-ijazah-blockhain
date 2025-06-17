document.getElementById('certifyForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('docName').value;
  const university = document.getElementById('docUniversity').value;
  const title = document.getElementById('docTitle').value;
  const ipk = document.getElementById('docIPK').value;
  const file = document.getElementById('docFile').files[0];

  const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MjQyOWQ5Ni0zYWVhLTQ2ZjQtYjA2YS1kMGM5NjU5ZjI5MDIiLCJlbWFpbCI6Im1hemlkYWJkdWxheml6MTRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImU3MDc5MTgwZDFlZThkZTlmZDFkIiwic2NvcGVkS2V5U2VjcmV0IjoiY2ZjMmZiODI3OTUzNTA4Mjg0ZjNhNWFlYmZhNTI4YmJkMGE1MTMzMTNhN2I0MDdmNzZkMTllYmI2YjQxMGJlZiIsImV4cCI6MTc4MTI1MjIyNH0.Xhyk8UgiEVMUcwAu_5OJIb_oTUb3DKiDJVX7Vt48iyY"; // Gunakan token lengkapmu di sini

  if (!file) {
    alert("Silakan pilih file PDF.");
    return;
  }

  try {
    // Upload file ke IPFS (PDF)
    const formData = new FormData();
    formData.append("file", file);

    const uploadResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`
      },
      body: formData
    });

    if (!uploadResponse.ok) {
      throw new Error("Gagal upload file. Status: " + uploadResponse.status);
    }

    const uploadResult = await uploadResponse.json();
    const fileCID = uploadResult.IpfsHash;

    const jsonData = {
      nama: name,
      universitas: university,
      judul: title,
      ipk: ipk,
      fileCID: fileCID,
    };

    console.log("✅ Data JSON:", jsonData);
    alert("File berhasil diunggah ke IPFS!\nCID: " + fileCID);
    const jsonRes = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`
      },
      body: JSON.stringify(jsonData)
    });

    const jsonUploaded = await jsonRes.json();
    console.log("JSON Data CID:", jsonUploaded.IpfsHash);
    */

  } catch (err) {
    console.error("❌ Upload error:", err);
    alert("Terjadi kesalahan saat upload ke IPFS. Cek konsol.");
  }
});
