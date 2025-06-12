document.getElementById('certifyForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('docName').value;
  const university = document.getElementById('docUniversity').value;
  const title = document.getElementById('docTitle').value;
  const ipk = document.getElementById('docIPK').value;
  const file = document.getElementById('docFile').files[0];

  alert(`Data berhasil dikumpulkan:\nNama: ${name}\nUniversitas: ${university}\nJudul: ${title}\nIPK: ${ipk}\nFile: ${file.name}`);
});
