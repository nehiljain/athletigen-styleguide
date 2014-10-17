"use strict";
function drawPopulationDistribution() {
  // you only give it the width. Height is calculated based on aspect ratio.

  
  var aspectRatio = (2 / 3);
  var width = 600;
  var height = aspectRatio * width;
  
  function chart() {
    // generate the population distribution here.
    
  }

  chart.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    height = Math.round(aspectRatio * width);
    return my;
  }

  return my;
}



var margin = {
              top: 20, 
              right: 0, 
              bottom: 10, 
              left: 20
            },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


//range of scores need to be provided. Currently it is 30 to 70. Min score and Max Score required
var x = d3.scale.linear()
    .domain([30, 70])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, .1])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(0);

var line = d3.svg.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); });

var histogram = d3.layout.histogram()
    .frequency(false)
    .bins(x.ticks(100));

var svg = d3.select(".curve-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);



d3.json("../data/powerCategoryData.json", function(error, faithful) {
  var data = histogram(faithful),
      kde = kernelDensityEstimator(epanechnikovKernel(17), x.ticks(100));


  svg.append("path")
      .datum(kde(faithful))
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", "#beaed4");
});


function kernelDensityEstimator(kernel, x) {
  return function(sample) {
    return x.map(function(x) {
      return [x, d3.mean(sample, function(v) { return kernel(x - v); })];
    });
  };
}

function epanechnikovKernel(scale) {
  return function(u) {
    return Math.abs(u /= scale) <= 1 ? .75 * (1 - u * u) / scale : 0;
  };
}

