

"use strict";


function drawPercentBarCharts(defaultData) {
  // you only give it the width. Height is calculated based on aspect ratio.


  /* Visual Properties of the graph defined here */

  
  var width = 408, // can be set using js/jquery
      height = 204,
      margin = {
          top: 0, 
          right: 40, 
          bottom: 0, 
          left: 40
      };
  var plottingWidth = width - margin.left - margin.right,
  barHeight = height - margin.top - margin.bottom;


   // ordinal scale for x axis
   var barDivPadding = Math.round(0.15 * plottingWidth / defaultData.length);

   var x = d3.scale.ordinal()
       .domain(defaultData.map(function(d) {return d.code;}))
       .rangeRoundBands([0, plottingWidth], .2, .3);

   // linear scale to map percentileDataset heights 

   //the max value of score is?
   var maxPercentile = 100;

   var y = d3.scale.linear()
       .domain([0, maxPercentile])
       .range([0, barHeight]);

    function convertToSafeCssName(name) {
        name =  name.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~] /g, '').toLowerCase();
        return name.replace(/ /g, '');
    }

  function chart(selectionString ) {
    // generate the population distribution here.
    console.log(defaultData);

    //color mapping to 7 categories

    var chart = d3.select(selectionString);

    var bar = chart.selectAll("div")
        .data(defaultData)
      .enter().append("div")
        // .sort(function(a, b) { return a.score - b.score; })
        .attr("class", function(d) { return convertToSafeCssName(d.code)
                                + " bar";})
        .style("height", function(d) {
          var barHeight = maxPercentile;
          return y(barHeight) + "px";
        });
        
    // this adds the  colored score part of the bar to each bar
    bar.append("div")
        .attr("class", function(d) { return convertToSafeCssName(d.code)
                                + " score text-center"; })
        .style("height", function(d) {
          var barHeight = 2;
          return y(barHeight) + "px";
        })
        .style("margin-top", function(d) {
          var barHeight = (100 - 2);;
          return y(barHeight) + "px";
        });

    // this adds the  colored score part of the bar to each bar
    // bar.append("div")
    //     .attr("class", "score text-center")
        
    // animation of the bars 
    

    var categoryButtons = d3.select(".category-label")
                            .selectAll("divs")
                            .data(defaultData)
                            .enter().append("div") 
                            // .sort(function(a, b) { return a.score - b.score; }) 
                            .attr("class", function(d) { return convertToSafeCssName(d.code) 
                              + " category-tile";
                            });
                            


    

  }

  chart.updateGraphData = function(jsonData) {

      console.log(jsonData);
      d3.selectAll(".score.text-center")
        .data(jsonData)
        .transition()
          .delay(function(d, i) { return (i+1) * 1000 })
          .duration(2000)
          .style("height", function(d) {
            var barHeight = d.score;
            return y(barHeight) + "px";
          })
          .style("margin-top", function(d) {
            var barHeight = (100 - d.score);
            console.log("transition",barHeight, y(barHeight))
            return y(barHeight) + "px";
          })
          .text(function(d) {return d.score;});
      d3.selectAll(".category-tile")
        .data(jsonData)
        .style("color", "white")
        .html(function(d) {
                            return '<p class="text-center">' + d.category_name + '</p>' +
                            '<span>' + d.score + '</span>';
        })
        .transition()
          .delay(function(d, i) { return (i) * 1000 })
          .duration(2000)
          .style("color", "black");
        
    
  }

  chart.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    plottingWidth = width - margin.left - margin.right;
    barDivPadding = Math.round(0.15 * plottingWidth / defaultData.length);
    x = d3.scale.ordinal()
       .domain(defaultData.map(function(d) {return d.code;}))
       .rangeRoundBands([0, plottingWidth], .2, .3);
    return chart;
  }
  chart.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    barHeight = height - margin.top - margin.bottom;
    y = d3.scale.linear()
       .domain([0, maxPercentile])
       .range([0, barHeight]);
    // console.log(chart)
    return chart;
  }

  return chart;
}


// var barChart = drawPercentBarCharts();









