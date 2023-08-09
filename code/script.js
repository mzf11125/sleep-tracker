const form = document.querySelector('form');
const chart = document.querySelector('.chart');

let data = [];

// Load data from localStorage
const storedData = localStorage.getItem('data');
if (storedData) {
  data = JSON.parse(storedData);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const date = form.querySelector('#date').value;
  const hours = form.querySelector('#hours').value;

  data.push({ date, hours });

  // Save data to localStorage
  localStorage.setItem('data', JSON.stringify(data));

  updateChart();
});

const clearButton = document.querySelector('#clear-button');

clearButton.addEventListener('click', () => {
  localStorage.removeItem('data');
  data = [];
  updateChart();
});

function updateChart() {
  const labels = [];
  const values = [];

  data.forEach((datum) => {
    labels.push(datum.date);
    values.push(datum.hours);
  });

  chart.innerHTML = '';

  const context = chart.getContext('2d');
  const chartData = {
    labels,
    datasets: [{
      label: 'Hours of Sleep',
      data: values,
      backgroundColor: '#00b894',
      borderColor: '#008b77',
      fill: false,
    }],
  };
  new Chart(context, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: true,
    },
  });
}