/**
 * This should not be used anymore.
 */


$(document).ready(function () {
               var dataExample = [
                                   ['Firefox',   45.0],
                                   ['IE',       26.8],
                                   {
                                       name: 'Chrome',
                                       y: 12.8,
                                       color: 'red'
                                   },
                                   ['Safari',    8.5],
                                   ['Opera',     6.2],
                                   ['Others',   0.7]
                                ];
                 
                var createGeneCategoryPieChart = function( divID, dataArg) {
                    // Build the chart
                        
                		console.log("gene details js loaded");
                        $('.'+divID).highcharts({
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            },
                            title: {
                                text: ''
                            },  
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: false
                                    }
                                }
                            },
                            series: [{
                                type: 'pie',
                                name: 'Browser share',
                                data: dataArg
                            }]
                        });
                };
                createGeneCategoryPieChart("chart", dataExample);

                        
        });

