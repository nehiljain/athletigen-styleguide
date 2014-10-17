var data = [
  {
    "gene":"ACE",
    "score":7,
  },
  {
    "gene":"BCTE",
    "score":15
  },
  {
    "gene":"CREA",
    "score":22
  }
];




function drawGenePieChart() {
  // you only give it the width. Height is calculated based on aspect ratio.


  /* Visual Properties of the graph defined here */

  var width;
  
  
  function chart(selectionString) {

    var radius = Math.min(width, width) / 2;
    // generate the population distribution here.
    var sortedData = d3.entries(data)
        // sort by value descending
        .sort(function(a, b) { return d3.descending(a.value.score, b.value.score); });
        // take the first option

    console.log(sortedData, sortedData[0], sortedData[sortedData.length - 1]);
    var color = d3.scale.linear()
    .domain([sortedData[sortedData.length - 1].value.score,sortedData[0].value.score])
        .range(["#f0f0f0","#bdbdbd"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.score; });

    var svg = d3.select(selectionString).append("svg")
        .attr("width", width)
        .attr("height", width)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + width / 2 + ")");


      data.forEach(function(d) {
        d.score = +d.score;
      });

      var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { console.log(d); return color(d.data.score); })
          .on("hover", function(d) {
              console.log(this);
              d3.select(this)
                  .style("fill", null)
                  .attr("class", "arc arc-hover");
          })
          .on("mouseout", function(d) {
              console.log(this);
              d3.select(this)
                  .style("fill", function(d) { console.log(d); return color(d.data.score); })
                  .attr("class", "arc");
          })
          .on("click", function(d) {
              console.log(this);
          });


  }

  chart.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return chart;
  }


  return chart;
}
