document.getElementById('verifyForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('studentName').value;
  const university = document.getElementById('university').value;

  // Simulasi verifikasi
  document.getElementById('result').innerText = `Mengecek keaslian dokumen untuk ${name} dari ${university}... (Belum terhubung ke smart contract)`;
});
