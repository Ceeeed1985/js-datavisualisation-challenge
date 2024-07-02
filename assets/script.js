const table1 = document.getElementById('table1');
const firstRow = table1.querySelector('tbody tr');
const selectYears = document.getElementById('years');



const years = [];

firstRow.querySelectorAll('th').forEach((cell, index) =>{
    if (index > 1){
    years.push(cell.textContent.trim());
    }
});

function chooseYear(){
    years.forEach(year => {
        const option = document.createElement('option');
        option.textContent = year;
        option.value = year;
        selectYears.appendChild(option);
        
    } )
}

chooseYear();

console.log(selectYears);

selectYears.addEventListener('change', () => {
    const selectedYear = selectYears.value;
    console.log(selectedYear)
})