var $border_color = "#efefef";
var $grid_color = "#ddd";
var $default_black = "#666";
var $red = "#FF6464";
var $blue = "#53ACDF";
var $green = "#abd14f";
var $yellow = "#ffaa3a";
var $grey = "#999999";
var $blue_one = "#74b1d4";
var $blue_two = "#84bad9";
var $blue_three = "#9bc7e0";
var $blue_four = "#afd2e6";
var $blue_five = "#badff2";

$(function () {
		
	var d1, d2, d3, data, chartOptions;

	d1 = [[0,12],[21,38],[13,29],[82,14],[52,43],[32,59],[92,48],[68,31],[32,24],[30,67],[10,45],[37,5],[18,41],[31,70]];
	d2 = [[23,40],[46,16],[20,42],[33,41],[51,39],[11,28],[32,36],[38,40],[99,22],[41,30],[21,18]];
	d3 = [[3,23],[4,36],[29,62],[13,55],[11,42],[6,37],[27,16],[3,45],[79,52],[39,90],[11,68]];

	data = [{ 
		label: "Likes", 
		data: d1,
	}, {
		label: "Shares",
		data: d2,
	}, {
		label: "Comments",
		data: d3,
	}];

	chartOptions = {
		xaxis: {
					
		},
		yaxis: {

		},
		series: {
			lines: {
				show: false, 
				fill: false,
				lineWidth: 4,
			},
			points: {
				show: true,
				radius: 3,
				fill: true,
				lineWidth: 6,
			}
		},
		grid:{
      hoverable: true,
      clickable: true,
      borderWidth: 1,
			tickColor: $border_color,
      borderColor: $grid_color,
    },
		legend: {
			show: true
		},
			
		tooltip: true,
		tooltipOpts: {
			content: '%s: %y'
		},
		shadowSize: 0,
		colors: [$red, $blue, $green, $yellow, $grey],
	};

	var holder = $('#scatter-chart');

	if (holder.length) {
		$.plot(holder, data, chartOptions );
	}


});