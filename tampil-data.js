document.addEventListener('DOMContentLoaded', function() {
  const dataList = document.getElementById('dataList');
  
  // Simulasi data
  const dummyData = [
    { nama: "Ari", univ: "Universitas A", judul: "Penelitian AI", ipk: "3.8" },
    { nama: "Budi", univ: "Universitas B", judul: "Blockchain Education", ipk: "3.9" }
  ];

  let html = "<ul>";
  dummyData.forEach(data => {
    html += `<li><strong>${data.nama}</strong> - ${data.univ} - ${data.judul} (IPK: ${data.ipk})</li>`;
  });
  html += "</ul>";

  dataList.innerHTML = html;
});
