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
		
		var d1, d2, data, chartOptions;

		d1 = [
			[1262304000000, 15], [1264982400000, 300], [1267401600000, 1205], [1270080000000, 1129], 
			[1272672000000, 2163], [1275350400000, 1205], [1277942400000, 2002], [1280620800000, 2217], 
			[1283299200000, 1200], [1285891200000, 2900], [1288569600000, 2600], [1291161600000, 1900]
		];
 
		d2 = [
			[1262304000000, 84], [1264982400000, 132], [1267401600000, 475], [1270080000000, 553],
			[1272672000000, 675], [1275350400000, 679], [1277942400000, 1289], [1280620800000, 1026], 
			[1283299200000, 1640], [1285891200000, 1892], [1288569600000, 2147], [1291161600000, 3256]
		];

		data = [{ 
			label: "Visits", 
			data: d1
		}, {
			label: "Shares",
			data: d2
		}];
 
		chartOptions = {
			xaxis: {
				min: (new Date(2009, 10, 2)).getTime(),
				max: (new Date(2010, 12, 4)).getTime(),
				mode: "time",
				tickSize: [1, "month"],
				monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				tickLength: 0
			},
				yaxis: {

				},
				series: {
					lines: {
						show: true, 
						fill: false,
						lineWidth: 2
					},
					points: {
						show: true,
						radius: 4.5,
						fill: true,
						fillColor: "#ffffff",
						lineWidth: 2
					}
				},
				 grid:{
	        hoverable: true,
	        clickable: true,
	        borderWidth: 1,
	        tickColor: $border_color,
        	borderColor: $grid_color,
	      },
	      shadowSize: 0,
				legend: {
					show: true,
					position: 'nw'
				},
				
				tooltip: true,
				tooltipOpts: {
					content: '%s: %y'
				},
				colors: [$red, $blue, $green, $yellow, $grey],
		};

		

		var holder = $('#line-chart');

		if (holder.length) {
			$.plot(holder, data, chartOptions );
		}


});