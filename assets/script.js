const table = document.getElementById("table1");
const countriesSelect = document.getElementById("countries");
const yearsSelect = document.getElementById("years");
const ctx = document.getElementById("chart1").getContext('2d');

let chart;

function populateSelectors() {
    const countries = new Set();
    const years = new Set();

    table.querySelectorAll('tbody tr').forEach(row => {
        countries.add(row.cells[1].innerText.trim());
    });

    table.querySelectorAll('tbody tr:first-child th').forEach((th, index) =>{
        if (index > 1) {
            years.add(th.innerText.trim());
        }
    })
    
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.innerText = country;
        countriesSelect.appendChild(option);
    });

    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.innerText = year;
        yearsSelect.appendChild(option);
    });   
}

function getData() {
    const selectedCountries = Array.from(countriesSelect.selectedOptions).map(option => option.value);
    const selectedYears = Array.from(yearsSelect.selectedOptions).map(option => option.value);

    const data = {};

    table.querySelectorAll('tbody tr').forEach(row => {
        const country = row.cells[1].innerText.trim();
        if (selectedCountries.includes(country)) {
            data[country] = {};
            for(let i = 2; i < row.cells.length; i++) {
                const year = table.querySelector('tbody tr:first-child th:nth-child(' + i + ')').innerText.trim(); // Correction ici
                if (selectedYears.includes(year)) {
                    data[country][year] = row.cells[i].innerText.trim();
                }
            }
        }
    });
    return data;
}

function updateChart() {
    const data = getData();
    const labels = Object.keys(data[Object.keys(data)[0]] || {});
    const datasets = Object.keys(data).map(country => ({
        label: country,
        data: Object.values(data[country]),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
    }));

    if (chart) {
        chart.destroy();
    }

    chart = new Chart (ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

countriesSelect.addEventListener('change', updateChart);
yearsSelect.addEventListener('change', updateChart);

populateSelectors();
updateChart();