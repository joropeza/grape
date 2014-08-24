var $border_color = "#efefef";
var $grid_color = "#ddd";
var $default_black = "#666";
var $red = "#eb4343";
var $blue = "#5da4cd";
var $green = "#abd14f";
var $yellow = "#ffaa3a";
var $yellow_one = "#FFF844";
var $grey = "#999999";
var $blue_one = "#74b1d4";
var $blue_two = "#84bad9";
var $blue_three = "#9bc7e0";
var $blue_four = "#afd2e6";
var $blue_five = "#badff2";

// Knob JS
$( document ).ready(function() {
	$(".knob").knob({
		change : function (value) {
			//console.log("change : " + value);
		},
		release : function (value) {
			//console.log(this.$.attr('value'));
			console.log("release : " + value);
		},
		cancel : function () {
			console.log("cancel : ", this);
		},
		/*format : function (value) {
			return value + '%';
		},*/
		draw : function () {
		// "tron" case
			if(this.$.data('skin') == 'tron') {
				this.cursorExt = 0.3;
				var a = this.arc(this.cv)// Arc
				, pa// Previous arc
				, r = 1;
				this.g.lineWidth = this.lineWidth;
				if (this.o.displayPrevious) {
					pa = this.arc(this.v);
					this.g.beginPath();
					this.g.strokeStyle = this.pColor;
					this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
					this.g.stroke();
				}
				this.g.beginPath();
				this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
				this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
				this.g.stroke();
				this.g.lineWidth = 2;
				this.g.beginPath();
				this.g.strokeStyle = this.o.fgColor;
				this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
				this.g.stroke();
				return false;
			}
		}
	});
});


// SparkLine Bar and Pie Charts
$(function () {
	$("#memory").sparkline([899, 99, 68, 87, 45], {
		type: 'pie',
		sliceColors: [$green, $yellow, $blue, $red, $yellow_one],
		width: '160px',
		height: '160px'
	});
  $('#dow').sparkline([5,6,7,9,9,5,3,2,4,5,6,7,9,9,5,3,2,2,4,5,6,7,9,9,5,3,2,2,4,5,6,7,9,9], {
    height: '80',
    type: 'bar',
    barSpacing: 7,
    barWidth: 12,
    barColor: '#e5f3fa',
    tooltipPrefix: 'Volume: '
  });
  $('#dow').sparkline([0,90,290,480,390,420,0,120,250,128,250,213,150,60,280,389,150,90,250,400,280], {
    composite: true,
    height: '80',
    fillColor:false,
    lineWidth: 1,
    highlightSpotColor: '#333',
    spotColor: '#eb4343',
    minSpotColor: '#eb4343',
    maxSpotColor: '#eb4343',
    spotRadius: 4,
    lineColor:'#eb4343',
    tooltipPrefix: 'Index: '
  });

});



//Data Tables
$(document).ready(function () {
  $('#data-table').dataTable({
    "sPaginationType": "full_numbers"
  });
  $("#data-table_length").css("display","none")
});