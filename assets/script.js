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


//DEUXIEME GRAPHIQUE//


// Fonction pour lire les données de table2
function readTableData2() {
  const table2 = document.getElementById('table2');
  if (!table2) {
    console.error('Table #table2 not found.');
    return { dataTable2: [], countriesTable2: [] };
  }

  const rowsTable2 = table2.querySelectorAll('tbody tr');
  const countriesTable2 = [];
  const dataTable2 = [];

  rowsTable2.forEach((rowTable2) => {
    const countryElement = rowTable2.querySelector('td:nth-child(2)');
    const value0709Element = rowTable2.querySelector('td:nth-child(3)');
    const value1012Element = rowTable2.querySelector('td:nth-child(4)');

    if (countryElement && value0709Element && value1012Element) {
      const countryTable2 = countryElement.textContent.trim();
      const value0709 = parseFloat(value0709Element.textContent);
      const value1012 = parseFloat(value1012Element.textContent);

      if (!isNaN(value0709) && !isNaN(value1012)) {
        countriesTable2.push(countryTable2);
        dataTable2.push({
          country: countryTable2,
          '2007-09': value0709,
          '2010-12': value1012
        });
      } else {
        console.error('Invalid numerical value found in row:', rowTable2);
      }
    } else {
      console.error('Failed to read data from row:', rowTable2);
    }
  });

  return { dataTable2, countriesTable2 };
}

function populateCountrySelect2(countries) {
  const select = document.getElementById('countrySelect2');
  if (!select) {
    console.error('Select element #countrySelect2 not found.');
    return;
  }

  countries.forEach((country) => {
    const option = document.createElement('option');
    option.textContent = country;
    select.appendChild(option);
  });
}

function createComparisonChart2(data, selectedCountry) {
  const ctx = document.getElementById('comparisonChart2').getContext('2d');
  const { dataTable2 } = data;

  // Trouver les données du pays sélectionné
  const countryData = dataTable2.find(entry => entry.country === selectedCountry);

  if (!countryData) {
    console.error(`No data found for country: ${selectedCountry}`);
    return;
  }

  // Vérifier et détruire le graphique existant s'il y en a un
  if (window.comparisonChart) {
    window.comparisonChart.destroy();
  }

  // Création du graphique en barres avec les données du pays sélectionné
  window.comparisonChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2007-09', '2010-12'],
      datasets: [
        {
          label: selectedCountry,
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
          borderWidth: 1,
          data: [countryData['2007-09'], countryData['2010-12']],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Prison population per 100,000 inhabitants'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Year'
          }
        }
      }
    }
  });
}

// Fonction pour mettre à jour le graphique en fonction du pays sélectionné
function updateComparisonChart2(selectedCountry) {
  const data = readTableData2(); // Recharger les données de la table si nécessaire
  createComparisonChart2(data, selectedCountry);
}

// Event listener pour le changement de sélection du pays
document.getElementById('countrySelect2').addEventListener('change', function(e) {
  const selectedCountry = e.target.value;
  updateComparisonChart2(selectedCountry);
});

// Initialisation du graphique avec le premier pays par défaut
document.addEventListener('DOMContentLoaded', function() {
  const data = readTableData2(); // Charger les données initiales
  const initialCountry = data.countriesTable2[0]; // Premier pays par défaut
  populateCountrySelect2(data.countriesTable2); // Peupler le menu déroulant
  createComparisonChart2(data, initialCountry); // Créer le graphique avec le premier pays par défaut
});