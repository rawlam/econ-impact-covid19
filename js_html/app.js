const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const Finance = 

// initialize page
function init() {

  // Fetching the JSON data
  d3.json(url).then((dataset) => {

    // create variable for sample names
    let bacteria = dataset.names;

    // create variable for dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // loop through sample names and append to dropdown menu
    for (i = 0; i < bacteria.length; i++) {
      dropdownMenu.append("option").text(bacteria[i]).property("value", bacteria[i]);
    }

    // initial data upon webpage start up
    demoInfo(940)
    trace1(940)
    trace2(940)
  });
  
}

// create function for displaying metadata in Demographic Info table
function demoInfo(sampleID) {

  // Fetching the JSON data
  d3.json(url).then((dataset) => {
    let listInfo = dataset.metadata;

    selectedData = listInfo.filter(item => item.id == sampleID)
    console.log(selectedData[0]);

    // Use D3 to select the table body
    let tbody = d3.select("#sample-metadata");

    // Append metadata to a new row in the table
    tbody.append("tr").append("td").text(`id: ${selectedData[0].id}`);
    tbody.append("tr").append("td").text(`ethnicity: ${selectedData[0].ethnicity}`);
    tbody.append("tr").append("td").text(`gender: ${selectedData[0].gender}`);
    tbody.append("tr").append("td").text(`age: ${selectedData[0].age}`);
    tbody.append("tr").append("td").text(`location: ${selectedData[0].location}`);
    tbody.append("tr").append("td").text(`bbtype: ${selectedData[0].bbtype}`);
    tbody.append("tr").append("td").text(`wfreq: ${selectedData[0].wfreq}`);
  });
}

// creating function for horizontal bar plot
function trace1(sampleID) {

  // Fetching the JSON data
  d3.json(url).then((data) => {

    // create variable for user selected sample from dropdown menu
    selectedData = data.samples.filter(item => item.id == sampleID)

    // gather the data
    let values = selectedData[0].sample_values.slice(0, 10).reverse();
    let ids = selectedData[0].otu_ids.slice(0, 10).map(item => `OTU ${item}`).reverse();
    let hoverText = selectedData[0].otu_labels.slice(0, 10).reverse();

    let barData = [{
      x: values,
      y: ids,
      text: hoverText,
      type: "bar",
      orientation: 'h'
    }];

    let layout = {
      title: "bar chart",
      height: 800,
      width: 600
    };

    // plot data
    Plotly.newPlot("bar", barData, layout);
  }); 
};

// Creating function for the bubble chart
function trace2(sampleID) {

  // Fetching the JSON data
  d3.json(url).then((data) => {

     // create variable for user selected sample from dropdown menu
    selectedData = data.samples.filter(item => item.id == sampleID)

    // gather the data
    let values = selectedData[0].sample_values;
    let ids = selectedData[0].otu_ids;
    let labels = selectedData[0].otu_labels;

    var trace = [{
      x: ids,
      y: values,
      mode: "markers",
      marker: {
        size: values,
        color: ids
      },
      text: labels
    }];

    let layout = {
      title: "bubble chart",
      showlegend: false,
      height: 400,
      width: 800,
      margin: {t: 30}
    };

    // plot data
    Plotly.newPlot("bubble", trace, layout);
  }); 
};

// Function called by drop down menu changes
function optionChanged(selectedSample) {

  // clear rows from previous selection
  d3.selectAll("#sample-metadata tr").remove(); 

  // use new user selected sample
  demoInfo(selectedSample);
  trace1(selectedSample);
  trace2(selectedSample);
}

init();
