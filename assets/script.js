    // Fonction pour lire les données du tableau
    function readTableData() {
        const table = document.getElementById('table1');
        const rows = table.querySelectorAll('tbody tr');
  
        // Récupérer les années depuis l'en-tête
        const headerCells = rows[0].querySelectorAll('th');
        const years = [];
        headerCells.forEach((cell, index) => {
          if (index > 1) {
            years.push(cell.textContent.trim());
          }
        });
  
        // Récupérer les données
        const data = [];
        rows.forEach((row, rowIndex) => {
          if (rowIndex > 0) {
            const cells = row.querySelectorAll('td, th div');
            const country = cells[1].textContent.trim();
            const countryData = { country };
            years.forEach((year, index) => {
              countryData[year] = parseFloat(cells[index + 2].textContent.replace(',', '.'));
            });
            data.push(countryData);
          }
        });
  
        return { data, years };
      }
  
      // Initialiser les données
      const { data, years } = readTableData();
      const countries = data.map(d => d.country);
  
      // Créer le select pour les années
      const yearSelect = document.getElementById('yearSelect');
      years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
      });
  
      // Créer le select pour les pays
      const countrySelect = document.getElementById('countrySelect');
      countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
      });
  
      // Fonction pour créer le graphique à barres
      function createBarChart(year) {
        const ctx = document.getElementById('barChart').getContext('2d');
        const yearData = data.map(d => d[year]);
  
        console.log("Creating bar chart for year:", year);
        console.log("Year data:", yearData);
  
        const chartData = {
          labels: countries,
          datasets: [{
            label: `Offences in ${year}`,
            data: yearData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        };
  
        if (window.barChart && typeof window.barChart.destroy === 'function') {
          window.barChart.destroy();
        }
  
        window.barChart = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
  
      // Fonction pour créer le graphique en lignes
      function createLineChart(country) {
        const ctx = document.getElementById('lineChart').getContext('2d');
        const countryData = data.find(d => d.country === country);
        const chartData = {
          labels: years,
          datasets: [{
            label: `Offences in ${country}`,
            data: years.map(year => countryData[year]),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        };
  
        if (window.lineChart && typeof window.lineChart.destroy === 'function') {
          window.lineChart.destroy();
        }
  
        window.lineChart = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
  
      // Event listeners pour les selects
      document.getElementById('yearSelect').addEventListener('change', (e) => {
        createBarChart(e.target.value);
      });
  
      document.getElementById('countrySelect').addEventListener('change', (e) => {
        createLineChart(e.target.value);
      });
  
      // Initialisation des graphiques
      createBarChart(years[0]);
      createLineChart(countries[0]);














// const firstRow = table1.querySelector('tbody tr');
// const selectYears = document.getElementById('years');







// const years = [];

// firstRow.querySelectorAll('th').forEach((cell, index) =>{
//     if (index > 1){
//     years.push(cell.textContent.trim());
//     }
// });

// function chooseYear(){
//     years.forEach(year => {
//         const option = document.createElement('option');
//         option.textContent = year;
//         option.value = year;
//         selectYears.appendChild(option);
        
//     } )
// }

// chooseYear();

// console.log(selectYears);

// selectYears.addEventListener('change', () => {
//     const selectedYear = selectYears.value;
//     console.log(selectedYear)
// })