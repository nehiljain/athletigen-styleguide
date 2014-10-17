var width = $(".gene-result").width(),
    height = $(".top-traits").height() - $(".panel-heading").height(),
    padding = 1.5, // separation between nodes
    maxRadius = 12;

var n = 47, // total number of nodes
    m = 1; // number of distinct clusters

var color = d3.scale.category10()
    .domain(d3.range(m)); //number of colors is number of clusters

var x = d3.scale.ordinal()
    .domain(d3.range(m))
    .rangeBands([0, width]);
var nodes = d3.range(n).map(function() { // creating n number of nodes features - radius and size. 
	//This should be changed and should not be random. Mostly JSON File
  var i = Math.floor(Math.random() * n),
      v = (i + 1) / n * -Math.log(Math.random());
  return {
    radius: Math.sqrt(v) * maxRadius,
    color: color(i)
  };
});

var svg = d3.select(".cluster-viz").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.nest()
    .key(function(d) { return d.color; })
    .entries(nodes)
    .forEach(force);

function force(entry, i) 
{
  var nodes = entry.values;

  var force = d3.layout.force()
      .nodes(nodes)
      .size([x.rangeBand(), height])
      .gravity(0.005)
      .charge(0)
      .on("tick", tick)
      .start();

  var circle = svg.append("g")
      .attr("transform", "translate(" + x(i) + ")")
    .selectAll("circle")
      .data(nodes)
    .enter().append("circle")
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d) { return d.color; })
      .call(force.drag);

  function tick(e) {
    circle
        .each(collide(.5))
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  // Resolves collisions between d and all other circles.
  function collide(alpha) {
    var quadtree = d3.geom.quadtree(nodes);
    return function(d) {
      var r = d.radius + maxRadius + padding,
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
      quadtree.visit(function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== d)) {
          var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + padding;
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }
}
