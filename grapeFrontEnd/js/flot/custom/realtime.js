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

var data = [];
var dataset;
var totalPoints = 100;
var updateInterval = 1000;
var now = new Date().getTime();


function GetData() {
	data.shift();

	while (data.length < totalPoints) {     
		var y = Math.random() * 100;
		var temp = [now += updateInterval, y];

		data.push(temp);
	}
}

var options = {
	series: {
		lines: {
			show: true,
			lineWidth: 0,
			fill: true
		}
	},
	xaxis: {
		mode: "time",
		tickSize: [5, "second"],
		tickFormatter: function (v, axis) {
		var date = new Date(v);
		if (date.getSeconds() % 20 == 0) {
			var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
			var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			return hours + ":" + minutes;
		} else {
				return "";
			}
		},
		axisLabel: "Time",
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		axisLabelFontFamily: 'Verdana, Arial',
		axisLabelPadding: 10
	},
	yaxis: {
		min: 0,
		max: 100,        
		tickSize: 15,
		tickFormatter: function (v, axis) {
			if (v % 10 == 0) {
				return v + "%";
			} else {
				return "";
			}
		},
		axisLabel: "CPU loading",
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		axisLabelFontFamily: 'Verdana, Arial',
		axisLabelPadding: 6
	},
	legend:{        
		show: true,
		position: 'nw'
	},

	tooltip: true,
	tooltipOpts: {
		content: '%s: %y'
	},

	colors: [$red, $blue, $green, $yellow, $grey],

	grid: {                
		hoverable: true,
		clickable: true,
		borderWidth: 1,
		tickColor: $border_color,
		borderColor: $grid_color,
	}
};

$(document).ready(function () {
	GetData();

	dataset = [
		{ label: "CPU", data: data, color: "#1e91cf" }
	];

	$.plot($("#flot-placeholder"), dataset, options);

	function update() {
		GetData();

		$.plot($("#flot-placeholder"), dataset, options)
		setTimeout(update, updateInterval);
	}

	update();
});
