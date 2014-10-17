$( document ).ready(function() {
	setTimeout(function() {

		// For each of the bars, get the data progress value and animate the load
		$(".bar-container").each(function(index, obj) {
			var categoryScore = $(obj).attr("data-progress");

			$(obj).animate({
			    height: categoryScore,
			    easing: 'swing'
			}, 1500).delay(1000);
		});

	}, 400); // let the user get oriented to the page before loading the bars

});