<!-- input.js -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyC6Kqn7jlvzuKhzzzBveB4mBb9CdSNAids",
    authDomain: "sertifikasi-ijazah-blockchain.firebaseapp.com",
    projectId: "sertifikasi-ijazah-blockchain",
    storageBucket: "sertifikasi-ijazah-blockchain.appspot.com", // perbaiki di sini
    messagingSenderId: "773758166917",
    appId: "1:773758166917:web:fc49960a2e3da5d9e4c6ec",
    measurementId: "G-2Z58NL6NT0"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  document.getElementById('certifyForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('docName').value;
    const university = document.getElementById('docUniversity').value;
    const title = document.getElementById('docTitle').value;
    const ipk = document.getElementById('docIPK').value;
    const file = document.getElementById('docFile').files[0];

    const JWT = "ISI_JWT_KAMU_DI_SINI";

    if (!file) {
      alert("Silakan pilih file PDF.");
      return;
    }

    try {
      // Upload ke IPFS (file)
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

      // Simpan ke Firestore
      const docRef = await addDoc(collection(db, "sertifikat"), {
        nama: name,
        universitas: university,
        judul: title,
        ipk: ipk,
        fileCID: fileCID,
        timestamp: new Date()
      });
      console.log("✅ Data disimpan ke Firestore:", docRef.id);

      alert("✅ Upload ke IPFS dan Firebase berhasil!\nCID: " + fileCID);

    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("Terjadi kesalahan saat upload ke IPFS atau Firebase. Cek konsol.");
    }
  });
</script>
