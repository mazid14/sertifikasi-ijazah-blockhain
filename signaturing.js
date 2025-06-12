document.getElementById('signForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const docId = document.getElementById('docId').value;

  // Simulasi proses tanda tangan
  document.getElementById('signResult').innerText = `Proses menandatangani dokumen ID: ${docId}... (Belum terhubung ke MetaMask)`;
});
