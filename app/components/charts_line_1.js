//Line chart regular interval y-axis data

//var data = "{{ customers }}"		//django renders data on pageload
//var defaultData = []
//var labels = [];
var chart_line_1 = '/charts/api/chart_line1/data/'  //'{% url "charts:chart_line_data" %}'
$.ajax({
    method: "GET",
    url: chart_line_1,
    success: function(data){			//takes data from the url specified in var endpoint
        labels = data.labels			//get from REST api view
        data1 = data.line1
		data2 = data.line2
		console.log(data)
        setChart1()						//if GETs data then does setchart function
    },
    error: function(error_data){
        console.log("error")
        console.log(error_data)
    }
})

const ctx = document.getElementById("lineChart1").getContext("2d");
var gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(250,174,50,1)');
gradient.addColorStop(1, 'rgba(250,174,50,0)');

var gradient2 = ctx.createLinearGradient(0, 0, 400, 0);
gradient2.addColorStop(0, 'rgba(174,250,50,1)');
gradient2.addColorStop(1, 'rgba(174,50,250,1)');

function setChart1(){
	const ctx = document.getElementById("lineChart1");
	var lineChart1 = new Chart(ctx, {
	    type: 'line',
		data: {
	        labels: labels,					//x axis labels, from server or []
	        datasets: [
				{
				data: data1,
	            label: 'Number of things',		//legend for that dataset
	          	fill : true,
				yAxisID: 'y-axis-01',
				pointStyle: 'circle', 		//'triangle', 'rect', 'rectRounded', 'rectRot', 'cross', 'crossRot', 'star', 'line', 'dash', Image, Array.
	            backgroundColor: gradient2,	//if fill: true
	            borderColor: blue,
	            borderWidth: 1,
				fillBetweenSet: 1,   //number of dataset to fill too [0,1,2....]
				fillBetweenColor: gradient
			},
			{
				data: data2,
				label: 'Other things',		//legend for that dataset
				fill : true,
				yAxisID: 'y-axis-01',
				pointStyle: 'circle', 		//'triangle', 'rect', 'rectRounded', 'rectRot', 'cross', 'crossRot', 'star', 'line', 'dash', Image, Array.
				backgroundColor: orangetr,	//if fill: true
				borderColor: orange,
				borderWidth: 1,
				//fillBetweenSet: 0,
				//fillBetweenColor: 'pinktr'
			}
			]

	    },
	    options: {
	        scales: {
	            yAxes: [{
					id: 'y-axis-01',
	                ticks: {
	                    beginAtZero:true
	                },
					scaleLabel: {
          				display: true,
          				labelString: 'Number'
        			}
	            }],
				xAxes: [{
					id: 'x-axis-01',
					ticks: {
						min: 0
					},
					scaleLabel: {
						display: true,
						labelString: 'Item'
					}
				}],
	        },
			tooltips : {
    			mode : 'index' // 'index'
  			},
			hover: {
  				mode: 'nearest',
  				intersect: true,
			},
			annotation: {
				annotations: [{
						id: 'h-line-01', // optional
						type: 'line',
						mode: 'horizontal',
						scaleID: 'y-axis-01',
						value: '125',
						borderColor: 'red',
						borderDash: [2, 2],
						borderWidth: 2,
						label: {
								enabled: true,
								backgroundColor: 'rgba(255,255,255,1)', // Background color of label, default below
								//fontFamily: "sans-serif", // Font family of text, inherits from global
								//fontStyle: "normal", // Font style of text, default "bold"
								fontSize: 12, // Font size of text, inherits from global
								fontColor: "red",// Font color of text, default below
								xPadding: 6,// Padding of label to add top/bottom, default below
								yPadding: 6,// Radius of label rectangle, default below
								cornerRadius: 6, // Anchor position of label on line, can be one of: top, bottom, left, right, center. Default below.
								position: "left",	// Adjustment along x-axis (left-right) of label relative to above number (can be negative)
													// For horizontal lines positioned left or right, negative values move the label toward the edge, and negative values toward the center.
								xAdjust: 175,			// Adjustment along y-axis (top-bottom) of label relative to above number (can be negative)
													// For vertical lines positioned top or bottom, negative values move the label toward the edge, and negative values toward the center.
								yAdjust: 0,			// Whether the label is enabled and should be displayed
									// Text to display in label - default is null
								content: "Max"
							},
							onClick: function(e) { // Fires when the user clicks this annotation on the chart (be sure to enable the event in the events array below).
							}
				}],
			},
	    }
	});

}
