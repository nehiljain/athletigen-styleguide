/*
	The order of genechip categories has to be the same as in the bar chart for the colorMap mapping.
	this can be merged into one thing lateron in JS code. Map all categories to these
	 */
	
	 /* a field called "url" has been added for the leaf nodes to track which webpage should be opened on click. 
	 The "value" field determines the relative size of the box compared to others. This can be the score you want to give every snp. 
	 The "name" field is the text that will be displayed for that node, be it a leaf or parent rectangle.
	 The "geneotype-score" = 0,1,2 based on the fav allele and the person's genotype
	 The "type" field is "category" and "snp". */


 	"use strict";

 	function drawGeneMap() {
 		var margin = {top: 0, right: 20, bottom: 0, left: 20}, //keep it the same as percentile bar graphs
					width = 300, // change to be dynamic
					height = 324 - margin.top - margin.bottom, // change to be dynamic with aspect ratio
					formatNumber = d3.format(",d"),
					transitioning;


		function chart(selectionString, jsonData) {
			/* create x and y scales */

			var x = d3.scale.linear()
				.domain([0, width])
				.range([0, width]);

			var y = d3.scale.linear()
				.domain([0, height])
				.range([0, height]);
				
			var treemap = d3.layout.treemap()
				.value(function(d) {return d.weight;})
				.children(function(d, depth) { return depth ? null : d.children; })
				.sort(function(a, b) { return a.weight - b.weight; }) //this can sort all the tiles based on something. Currently it sums all the 'value's of the leaf nodes and then sort the parent based on that. 
				.ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
				.round(false);

			/* create svg */
			var svg = d3.select(/*"#genechip" */selectionString).append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.bottom + margin.top)
				.style("margin-left", -margin.left + "px")
				.style("margin.right", -margin.right + "px")
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
				.style("shape-rendering", "crispEdges");

		 	// creating the color mapping

		 	var categoryClassData = [   {code: "anaerobic_capacity", color_name: "#F7B74D"},
		 	                   {code: "power", color_name: "#FF7B5B"},
		 	                     {code: "injury_risk", color_name: "#A585E8"},
		 	                     {code: "recovery", color_name: "#72A9E8"},
		 	                     {code: "metabolic_efficiency", color_name: "#3CD0C8"},
		 	                     {code: "endurance", color_name: "#47C167"},
		 	                     {code: "motivation", color_name: "#ECCD2C"}
		 	       ];
			var colorMap = d3.scale.ordinal()
			               .domain(categoryClassData.map(function(d) {return d.code;}))
		             	   .range(categoryClassData.map(function(d) {return d.color_name;}));

		    // The navigation header is called 'grandparent'. 
		    // This will be hidden and not vissble on the page
		    var grandparent = svg.append("g")
		    	.attr("class", "grandparent");

			
			/* load in data, display root */
			var root = jsonData;
				initialize(root);
				accumulate(root);
				console.log("root ", root);
				layout(root);
				display(root);

				function initialize(root) {
					console.log("root ", root);
					root.x = root.y = 0;
					root.dx = width;
					root.dy = height;
					root.depth = 0;
				}

				// Aggregate the values for internal nodes. This is normally done by the
				// treemap layout, but not here because of the custom implementation.
				function accumulate(d) {
					return d.children
					? d.weight = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
					: d.weight;
					}

				// Compute the treemap layout recursively such that each group of siblings
				// uses the same size (1×1) rather than the dimensions of the parent cell.
				// This optimizes the layout for the current zoom state. Note that a wrapper
				// object is created for the parent node for each group of siblings so that
				// the parent’s dimensions are not discarded as we recurse. Since each group
				// of sibling was laid out in 1×1, we must rescale to fit using absolute
				// coordinates. This lets us use a viewport to zoom.
				function layout(d) {
					if (d.children) {
					treemap.nodes({children: d.children});
					d.children.forEach(function(c) {
					c.x = d.x + c.x * d.dx;
					c.y = d.y + c.y * d.dy;
					c.dx *= d.dx;
					c.dy *= d.dy;
					c.parent = d;
					layout(c);
					});
					}
				}

				/* display shows the treemap and writes the embedded transition function */

				function display(d) {
					/* create grandparent bar at top */
					grandparent
						.datum(d.parent)
						.on("click", transition)
						.select("text")
						.text("Zoom Out");

					var g1 = svg.insert("g", ".grandparent")
						.datum(d)
						.attr("class", "depth");

					/* add in data */
					var g = g1.selectAll("g")
						.data(d.children)
						.enter().append("g");
						


					/* Adding for any level transition on child click */
					g.filter(function(d) { 
						// console.log("transition on child click d", d);
						return d.children; 
					})
						.classed("children", true)
						.on("click", transition);

					/* write children rectangles */
					g.selectAll(".child")
						.data(function(d) { return d.children || [d]; })
						.enter().append("rect")
						   .attr("class", function(d) { 
						   	console.log("child",d); 
						   	var code = d.code ? d.code : d.parent.code;
						   	return "child " +  code + " " +d.type;
						   })
						   .call(rect)
						   .append("title")
						   .text(function(d) { return d.name; });
						   

					/* write parent rectangle */
					g.append("rect")
						.attr("class", function(d) { 
							console.log("rect",d);
							var code = d.code ? d.code : d.parent.code; 
							return "parent " + code + " " + d.type;
						})
						.call(rect)
						/* open new window based on the json's URL value for leaf nodes */
						/* Chrome displays this on top */
						.on("click", function(d) { 
							console.log("Click on the rect", d);

							if(!d.children){
								// console.log("Going to Url", d);
								window.open(d.url); 
							}
						})
						.append("title")
						.text(function(d) { return d.name; });
					d3.selectAll("rect.parent")	
						.transition()
							.delay(function(d, i) { return (i+1) * 1000 })
        					.duration(2000)
							.style("fill", function(d) { 
								var tileOpacity;
								if (d.type === "category") {
									console.log(colorLuminance(colorMap(d.code),0));
									return colorLuminance(colorMap(d.code),0);
								} else if ( d.type === "snp") {
									return colorLuminance(colorMap(d.parent.code), (0.2 * (2 - d["alleleMatchingFactor"])));
								}
								return d.parent ? colorMap(d.parent.code) : null; 
							}); /*should be d.weight*/
						

					/* Adding a foreign object instead of a text object, allows for text wrapping */
					g.append("foreignObject")
						.call(rect)
						/* open new window based on the json's URL value for leaf nodes */
						/* Firefox displays this on top */
						.on("click", function(d) { 
							// console.log("Click on the rect", d);
							if(!d.children){
								// console.log("Going to Url", d);
								window.open(d.url); 
						}
					})
						.attr("class","foreignobj")
						.append("xhtml:div") 
						.attr("dy", ".75em")
						.html(function(d) { return d.name; 
						})
						.attr("class","textdiv"); //textdiv class allows us to style the text easily with CSS

					/* create transition function for transitions */
					function transition(d) {
						// console.log("transition function:: d:",d);
						if (transitioning || !d) return;
						transitioning = true;

						var g2 = display(d),
						t1 = g1.transition().duration(600),
						t2 = g2.transition().duration(600);

						// Update the domain only after entering new elements.
						x.domain([d.x, d.x + d.dx]);
						y.domain([d.y, d.y + d.dy]);

						// Enable anti-aliasing during the transition.
						svg.style("shape-rendering", null);

						// Draw child nodes on top of parent nodes.
						svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });

						// Fade-in entering text.
						g2.selectAll("text").style("fill-opacity", 0);
						g2.selectAll("foreignObject div").style("display", "none"); /*added*/

						// Transition to the new view.
						t1.selectAll("text").call(text).style("fill-opacity", 0);
						t2.selectAll("text").call(text).style("fill-opacity", 1);
						t1.selectAll("rect").call(rect);
						t2.selectAll("rect").call(rect);

						t1.selectAll(".textdiv").style("display", "none"); /* added */
						t1.selectAll(".foreignobj").call(foreign); /* added */
						t2.selectAll(".textdiv").style("display", "block"); /* added */
						t2.selectAll(".foreignobj").call(foreign); /* added */ 

						// Remove the old node when the transition is finished.
						t1.remove().each("end", function() {
						svg.style("shape-rendering", "crispEdges");
						transitioning = false;
						});

					}//endfunc transition

					return g;
				}//endfunc display

				function text(text) {
					text.attr("x", function(d) { return x(d.x) + 6; })
					.attr("y", function(d) { return y(d.y) + 6; });
				}


				function colorLuminance(hex, lum) {

					// validate hex string
					hex = String(hex).replace(/[^0-9a-f]/gi, '');
					if (hex.length < 6) {
						hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
					}
					lum = lum || 0;

					// convert to decimal and change luminosity
					var rgb = "#", c, i;
					for (i = 0; i < 3; i++) {
						c = parseInt(hex.substr(i*2,2), 16);
						c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
						rgb += ("00"+c).substr(c.length);
					}

					return rgb;
				}

				function rect(rect) {
					rect.attr("x", function(d) { return x(d.x); })
					.attr("y", function(d) { return y(d.y); })
					.attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
					.attr("height", function(d) { return y(d.y + d.dy) - y(d.y); })
					.style("fill", function(d) { 
						var tileOpacity;
						if (d.type === "category") {
							// console.log(colorLuminance(colorMap(d.code),0));
							return colorLuminance("#E0E0E0",0);
						} else if ( d.type === "snp") {
							console.log(d.parent.code);
							return colorLuminance(colorMap(d.parent.code), (0.2 * (2 - d["geneotype-score"])));
						}
						return d.parent ? colorMap(d.parent.code) : null; 
					}); // this handles the color of the map
				}

				function foreign(foreign){ /* added */
					foreign.attr("x", function(d) { return x(d.x); })
					.attr("y", function(d) { return y(d.y); })
					.attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
					.attr("height", function(d) { return y(d.y + d.dy) - y(d.y); });
				}

				function name(d) {
					return d.parent
					? name(d.parent) + "." + d.name
					: d.name;
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






