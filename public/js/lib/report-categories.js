var demoDistData = 
[39.42,41.03,33.22,32.45,56.70,56.57,39.49,44.67,82.471,35.45,58.242,55.322,33.436,55.162,32.134,42.105,24.289,79.217,50.818,28.305,66.919,34.765,41.705,56.403,66.261,46.704,38.814,42.527,39.815,29.509,67.460,43.165,40.020,52.288,29.732,32.095,59.324,51.662,32.222,26.337,53.382,32.470,25.523,53.586,56.747,43.403,31.388,44.059,61.65,79.412,55.242,30.266,46.475,56.922,53.1,37.94,54.004,44.045,67.53,26.024,44.52,49.928,48.404,36.276,49.824,77.481,43.589,34.467,50.196,57.267,70.550,64.000,38.850,66.487,56.412,65.18,56.248,32.666,56.673,59.08,59.817,61.39,30.172,43.658,61.035,49.741,43.507,74.372,73.176,42.590,44.241,57.884,54.138,63.302,49.985,64.896,49.114,29.442,61.7429,66.412];




// IIFE - Immediately Invoked Function Expression
  (function(reportCategoryPage) {

    // The global jQuery object is passed as a parameter
    reportCategoryPage(window.jQuery, window, document);

  }(function($, window, document) {

    	// The $ is now locally scoped 
    	console.log("The $ is now locally scoped");

	    // Listen for the jQuery ready event on the document
	    console.log("Listen for the jQuery ready event on the document");
	    $(function() {

	    	console.log("The DOM is ady");
        var distributionChart = drawPopDistn().width(300).height(400);
        // *
        //  * example call
        //  * chart(".curve-area")
         

        distributionChart(".curve-area", demoDistData);
        var genesPieChart = drawGenePieChart().width(300);
        /**
         * example call
         * chart(".curve-area")
         */

        genesPieChart(".gene-pie-chart");
        $(".gene-pie-chart").css("background", 
          "url("+ "http://media.npr.org/news/graphics/2012/07/oly-diets-icons/oly-diets-lift.gif" +") no-repeat center center");
        $('.arc').on('mouseenter', function(){
          console.log("Highlight the row in the table");
        });
	   	});
	   	// The rest of the code goes here!

  	}
  ));
