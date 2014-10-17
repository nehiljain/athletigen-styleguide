"use strict";
/**
 * Data required
 * 1. ../data/powerCategoryData.json - This data is used to calculate the distribution of categories,
 * contains different values from 1000 genomes project.
 *
 * 2. User's percentile.
 */


function drawPopDistn() {
  // you only give it the width. Height is calculated based on aspect ratio.

  
  var width = 600;
  var height = 600;
  var margin = {
              top: 20, 
              right: 0, 
              bottom: 10, 
              left: 10
            };
  function chart(selectionString, jsonData) {
    // generate the population distribution here.
    console.log("height ", height);
    console.log("width ", width);
    console.log("margin", margin);
    console.log("selectionString ", selectionString);

    var drawWidth = width - margin.left - margin.right,
        drawHeight = height - margin.top - margin.bottom;

    var pathData;

    //range of scores need to be provided. Currently it is 30 to 70. Min score and Max Score required
    var x = d3.scale.linear()
        .domain([0, 100])
        .range([0, drawWidth]);

        /**
         * this is the range of data values in the research data.
         * .1 should be changed with the total number of people or max number of people 
         * 
         */
    var y = d3.scale.linear()
        .domain([0, 0.05]) 
        .range([drawHeight * 2, 0]);

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
        .bins(x.ticks(1));

    var svg = d3.select(selectionString).append("svg")
        .attr("width", drawWidth + margin.left + margin.right)
        .attr("height", drawHeight + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + drawHeight + ")")
        /*.call(xAxis)*/ // comment this to make the axis.
      .append("text")
        .attr("class", "label")
        .attr("x", drawWidth)
        .attr("y", -6);

    svg.append("g")
        .attr("class", "y axis");
        /* .call(yAxis); */ //comment this to make the axis


    var powerCategoryData = jsonData;
      var data = histogram(powerCategoryData),
          kde = kernelDensityEstimator(epanechnikovKernel(12), x.ticks(100));

      var getPathPromise = new Promise(function(resolve, reject) {
          pathData = kde(powerCategoryData);

          if(pathData == null) { reject();}

          resolve("Path generated");
              
      });

      getPathPromise.then(function(msg) {
            console.log("Path generation", msg);
            var userCircleAttrs = 
                          {
                            "x_axis": x(pathData[65][0]), // from backend
                            "y_axis": y(pathData[65][1]), // pathData Array
                            "radius": 5,
                          };
            svg.append("path")
                  .datum(pathData)
                  .attr("class", "line")
                  .attr("d", line)
                  .attr("stroke", "#9E8DB4")
                  .attr("fill", "#beaed4");
                           
            console.log("userCircleAttrs",userCircleAttrs);
            svg.append("circle")
                .attr("class", "user-circle")
                .attr("cx", function (d) { return userCircleAttrs.x_axis; })
                .attr("cy", function (d) { return userCircleAttrs.y_axis; })
                .attr("r", function (d) { return userCircleAttrs.radius; })
                .attr("fill", "#9E8DB4")
                .attr("stroke", "#FFF");
          // If we want to add a line.
            // svg.append("line")
            //     .attr("class", "user-line")
            //     .attr("x1", x(pathData[55][0]))
            //     .attr("y1", y(pathData[0][1]))
            //     .attr("x2", x(pathData[55][0]))
            //     .attr("y2", y(pathData[55][1]) + 4.5)
            //     .attr("stroke-linecap","round")
            //     .attr("stroke-dasharray","5,5");
                
      }).catch(function(err) {
            console.log("Path generation failed", err);
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

  }

  chart.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return chart;
  }
  chart.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    return chart;
  }

  return chart;
}





