/* globals Chart:false, feather:false */

// save to variable local API links
const stocks_url = 'http://127.0.0.1:5000/api/v1.0/stocks'
const sectors_url = 'http://127.0.0.1:5000/api/v1.0/sectors'
const quotes_url = 'http://127.0.0.1:5000/api/v1.0/quotes'
const covid_data_url = 'http://127.0.0.1:5000/api/v1.0/us-covid-data'

console.log("success");
// grab html buttons and heading
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const button5 = document.getElementById("button5");
const heading = document.getElementById("sector");

// create responsive buttons
button1.addEventListener('click', enData);
button2.addEventListener('click', finData);
button3.addEventListener('click', healthData);
button4.addEventListener('click', ITData);
button5.addEventListener('click', REData);
// ###########################################################################################


// initialize page with drowndowm menus and charts
function init() {

  // Fetching data
  d3.json(quotes_url).then((dataset) => {

    let dropdownMenu = d3.select("#selDataset");
    let dropdownMenu2 = d3.select("#selDataset2");
    let dropdownMenu3 = d3.select("#selDataset3");
    let dropdownMenu4 = d3.select("#selDataset4");

    const dates = [];
    const uniqueDates = [];

    for (i = 0; i < dataset.length; i++) {
      date = dataset[i]['date']
      dates.push(date);

      // Check if the current date is already in the array of unique dates.
      if (!uniqueDates.includes(date)) {

        // If the date is not in the array, add it to the array.
        uniqueDates.push(date);
      }
    }
    // console.log(uniqueDates)

    // start date dropdown displaying in accending order
    uniqueDates.forEach(date => {
      dropdownMenu.append("option").text(date).property("value", date);
      dropdownMenu3.append("option").text(date).property("value", date);
    });

    // end date dropdown displaying in decending order
    uniqueDates.reverse().forEach(date => {
      dropdownMenu2.append("option").text(date).property("value", date);
      dropdownMenu4.append("option").text(date).property("value", date);
    });

    //initialize charts
    trace1('En', '2020-01-06', "2023-03-02")
    trace2('2020-01-06', "2023-03-02")
  });
}
// ###########################################################################################


// STOCK MARKET SECTOR DATA
// retain previous inputs for trace1
var currentInfoList = []

// create function for multi line chart
function trace1(sector, startDate, endDate) {
  console.log('RESTART CHART 1')

  currentInfoList = []

  currentInfoList.push(sector, startDate, endDate)

  // Fetching local API JSON data
  d3.json(stocks_url).then((dataset) => {
    
    var sectorData = dataset.filter(item => item.sector_id === sector);

    sectorList = []

    sectorData.forEach(date => {
      sectorList.push(date.symbol_id);
    });

    // Fetching local API JSON data
    d3.json(quotes_url).then((dataset) => {

      // from user dropdown input filter stock data for chart
      const stockData1 = dataset.filter(item => item.date >= startDate && item.date <= endDate && sectorList[0].includes(item.symbol_id));
      const stockData2 = dataset.filter(item => item.date >= startDate && item.date <= endDate && sectorList[1].includes(item.symbol_id));
      const stockData3 = dataset.filter(item => item.date >= startDate && item.date <= endDate && sectorList[2].includes(item.symbol_id));
      const stockData4 = dataset.filter(item => item.date >= startDate && item.date <= endDate && sectorList[3].includes(item.symbol_id));
      const stockData5 = dataset.filter(item => item.date >= startDate && item.date <= endDate && sectorList[4].includes(item.symbol_id));

      // filter opening values
      const sectorValues = dataset.filter((item) => sectorList.includes(item.symbol_id)).map(item => item.open);
      const openValues1 = stockData1.map(item => item.open)
      const openValues2 = stockData2.map(item => item.open)
      const openValues3 = stockData3.map(item => item.open)
      const openValues4 = stockData4.map(item => item.open)
      const openValues5 = stockData5.map(item => item.open)

      // populate statistic table
      summaryStats(sectorValues, 1, sector)
      summaryStats(openValues1, 2, sectorList[0])
      summaryStats(openValues2, 3, sectorList[1])
      summaryStats(openValues3, 4, sectorList[2])
      summaryStats(openValues4, 5, sectorList[3])
      summaryStats(openValues5, 6, sectorList[4])

      // create multi-line chart
      const ctx = document.getElementById("myChart");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: stockData1.map(item => item.date),
          datasets: [
            {
              label: sectorList[0],
              data: stockData1.map(item => item.open),
              borderColor: "#ff0000",
              fill: false,
              backgroundColor: 'transparent',
              borderWidth: 1,
            },
            {
              label: sectorList[1],
              data: stockData2.map(item => item.open),
              borderColor: "#000000",
              fill: false,
              backgroundColor: 'transparent',
              borderWidth: 1,
            },
            {
              label: sectorList[2],
              data: stockData3.map(item => item.open),
              borderColor: '#ae6350',
              fill: false,
              backgroundColor: 'transparent',
              borderWidth: 1,
            },
            {
              label: sectorList[3],
              data: stockData4.map(item => item.open),
              borderColor: "#0000ff",
              fill: false,
              backgroundColor: 'transparent',
              borderWidth: 1,
            },
            {
              label: sectorList[4],
              data: stockData5.map(item => item.open),
              borderColor: "#009700",
              fill: false,
              backgroundColor: 'transparent',
              borderWidth: 1,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          title: {
            display: true,
            text: "Line Chart from " + startDate + " to " + endDate
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Date"
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Opening Price"
              },
              ticks: {
                beginAtZero: false
              }
            }]
          }
        }
      });
    }); 
  });
};
// ###########################################################################################


// COVID-19 DATA
// retain previous inputs for trace2
var currentInfoList2 = []

// create function for bar chart
function trace2(startDate, endDate) {
  console.log('RESTART CHART 2')

  currentInfoList2 = []

  currentInfoList2.push(startDate, endDate)

  // Fetching local API JSON data
  d3.json(covid_data_url).then((dataset) => {

    // from user dropdown input filter covid-19 data for chart
    const filteredData = dataset.filter(item => item.date_reported >= startDate && item.date_reported <= endDate);

    // filter case values from dataset
    const values = filteredData.map(item => item.new_cases)

    // populate statistics table
    summaryStats(values, 7, 'COVID-19 New Cases')

    // create bar chart
    const ctx2 = document.getElementById("myChart2");
    const chart2 = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: filteredData.map(item => item.date_reported),
        datasets: [{
          label: "New Cases (Daily)",
          data: filteredData.map(item => item.new_cases),
          backgroundColor: '#DC143C',
          barThickness: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        title: {
          display: true,
          text: "Bar Chart from " + startDate + " to " + endDate
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Date"
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: "New Cases"
            },
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }); 
};
// ###########################################################################################


// Function for sidebar button clicks on sectors
function enData(){
  trace1('En', currentInfoList[1], currentInfoList[2]);
  document.getElementById("sector").innerText = "Energy Sector";
}

function finData(){
  trace1('Fr', currentInfoList[1], currentInfoList[2]);
  document.getElementById("sector").innerText = "Finance Sector";
}

function healthData(){
  trace1('Hc', currentInfoList[1], currentInfoList[2]);
  document.getElementById("sector").innerText = "Healthcare Sector";
}

function ITData(){
  trace1('IT', currentInfoList[1], currentInfoList[2]);
  document.getElementById("sector").innerText = "Information Technology Sector";
}

function REData(){
  trace1('RE', currentInfoList[1], currentInfoList[2]);
  document.getElementById("sector").innerText = "Real Estate Sector";
}
// ###########################################################################################


// Functions called by dropdown menu changes by user
function optionChanged1(startDate) {

  // use new user selected sample
  // run independent from trace2
  trace1(currentInfoList[0], startDate, currentInfoList[2]);

  // run trace2 as dependent
  trace2(startDate, currentInfoList[2]);
}

function optionChanged2(endDate) {

  // use new user selected sample
  // run independent from trace2
  trace1(currentInfoList[0], currentInfoList[1], endDate);

  // run trace2 as dependent
  trace2(currentInfoList[1], endDate);
}

function optionChanged3(startDate) {

  // run trace1 as dependent
  // trace1(currentInfoList[0], startDate, currentInfoList2[1]);

  // run independent from trace1
  // trace2(startDate, currentInfoList2[1]);
}

function optionChanged4(endDate) {

  // run trace1 as dependent
  // trace1(currentInfoList[0], currentInfoList2[0], endDate);

  // run independent from trace1
  // trace2(currentInfoList2[0], endDate);
}
// ###########################################################################################


// Summary statistics function with mean, median, mode, range, variance and standard deviation
// Provided mostly by ChatGPT-3
function summaryStats(dataset, column, label){

  // Calculate summary statistics
  const sortedDataset = dataset.sort((a, b) => a - b);
  const max = sortedDataset[sortedDataset.length - 1]
  const min = sortedDataset[0]
  const mean = dataset.reduce((acc, val) => acc + val, 0) / dataset.length;
  const median = sortedDataset.length % 2 === 0 ? (sortedDataset[sortedDataset.length / 2 - 1] + sortedDataset[sortedDataset.length / 2]) / 2 : sortedDataset[Math.floor(sortedDataset.length / 2)];
  const mode = sortedDataset.filter((value, index, array) => array.indexOf(value) === index).reduce((acc, val) => {
    const count = sortedDataset.filter(v => v === val).length;
    if (count > acc.count) {
      acc = { value: val, count: count };
    }
    return acc;
  }, { value: null, count: 0 }).value;
  const range = sortedDataset[sortedDataset.length - 1] - sortedDataset[0];
  const variance = dataset.reduce((acc, val) => acc + (val - mean) ** 2, 0) / dataset.length;
  const stdDev = Math.sqrt(variance);

  // Get reference to the table element
  const table = document.getElementById('summary-table');

  // Populate table cells with summary statistics
  table.rows[1].cells[column].textContent = max.toFixed(2);
  table.rows[2].cells[column].textContent = min.toFixed(2);
  table.rows[3].cells[column].textContent = mean.toFixed(2);
  table.rows[4].cells[column].textContent = median.toFixed(2);
  table.rows[5].cells[column].textContent = mode === null ? 'None' : mode.toFixed(2);
  table.rows[6].cells[column].textContent = range.toFixed(2);
  table.rows[7].cells[column].textContent = stdDev.toFixed(2);
  document.getElementById(`header${column}`).innerText = label;
}


init();

// when refreshing, go to top of page
window.onload = function () {
  window.scrollTo(0, 0);
  document.body.focus();
}