var $border_color = "#efefef";
var $grid_color = "#ddd";
var $default_black = "#666";
var $red = "#FF6464";
var $blue = "#53ACDF";
var $green = "#abd14f";
var $yellow = "#ffaa3a";
var $yellow_one = "#FFF844";
var $grey = "#999999";
var $blue_one = "#74b1d4";
var $blue_two = "#84bad9";
var $blue_three = "#9bc7e0";
var $blue_four = "#afd2e6";
var $blue_five = "#badff2";


//Dropdown Menu
$( document ).ready(function() {
	$('#menu > ul > li > a').click(function() {
		$('#menu li').removeClass('active');
		$(this).closest('li').addClass('active'); 
		var checkElement = $(this).next();
		if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
			$(this).closest('li').removeClass('active');
			checkElement.slideUp('normal');
		}
		if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
			$('#menu ul ul:visible').slideUp('normal');
			checkElement.slideDown('normal');
		}
		if($(this).closest('li').find('ul').children().length == 0) {
			return true;
		} else {
			return false; 
		}   
	});
});

//Sidebar
$(function() {
	var s = 0;
	$('.menu-toggle').click(function() {
		if (s == 0) {
			s = 1;
			$( "#sidebar" ).animate({left: "-250px" }, 100 );
			$('.dashboard-wrapper').animate({'margin-left': "0px" }, 100);
		} else {
			s = 0;
			$('#sidebar').animate({left: "0px" }, 100);
			$('.dashboard-wrapper').animate({'margin-left': "250px" }, 100);
		}
	});
});


// Today income
var incrementJ = $('#today_income').text();

$({numberValue: incrementJ}).animate({
	numberValue: 7845
},{
	duration: 7000,
	easing: 'linear',
	step: function () { 
		$('#today_income').text(Math.ceil(this.numberValue)); 
	},
	 done: function () {
		$('#today_income').text(Math.ceil(this.numberValue));
	}
});

// Today expenses
var incrementK = $('#today_expenses').text();

$({numberValue: incrementK}).animate({
	numberValue: 3121
},{
	duration: 9000,
	easing: 'linear',
	step: function () { 
		$('#today_expenses').text(Math.ceil(this.numberValue)); 
	},
	 done: function () {
		$('#today_expenses').text(Math.ceil(this.numberValue));
	}
});

// SparkLine Bar
$(function () {
	$('#currentSale').sparkline('html', {
		type: 'bar',
		barColor: [$yellow, $red, $green, $blue],
		barWidth: 6,
		height: 27,
	});

	$('#currentBalance').sparkline('html', {
		type: 'bar',
		barColor: [$green, $yellow, $red, $blue],
		barWidth: 6,
		height: 27,
	});
});


$( document ).ready(function() {
				
	//Header Bar
	$('#show-header-bar').on('click', function(){
		if($('#show-header-bar').hasClass('open')){
			$('.header-bar').attr('style','top: -200px');
			$('#show-header-bar').removeClass('open')
		} else {
			$('.header-bar').attr('style','top: 60px');
			$('#show-header-bar').addClass('open')
		}
	});

	//Right Info Bar
	$('#show-right-bar').on('click', function(){
		if($('#show-right-info-bar').hasClass('move')){
			$('.right-info-bar').attr('style','right: -250px');
			$('#show-right-info-bar').removeClass('move')
		} else {
			$('.right-info-bar').attr('style','right: 0px');
			$('#show-right-info-bar').addClass('move')
		}
	});
});


// scrollUp full options
$(function () {
	$.scrollUp({
		scrollName: 'scrollUp', // Element ID
		scrollDistance: 300, // Distance from top/bottom before showing element (px)
		scrollFrom: 'top', // 'top' or 'bottom'
		scrollSpeed: 300, // Speed back to top (ms)
		easingType: 'linear', // Scroll to top easing (see http://easings.net/)
		animation: 'fade', // Fade, slide, none
		animationSpeed: 200, // Animation in speed (ms)
		scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
		//scrollTarget: false, // Set a custom target element for scrolling to the top
		scrollText: 'Scroll to top', // Text for element, can contain HTML
		scrollTitle: false, // Set a custom <a> title if required.
		scrollImg: false, // Set true to use image
		activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
		zIndex: 2147483647 // Z-Index for the overlay
	});
});

// Mobile Nav
$('#mob-nav').click(function(){
	if($('aside.open').length > 0){

		$( "aside" ).animate({left: "-250px" }, 500 ).removeClass('open');
	} else {
		$( "aside" ).animate({left: "0px" }, 500 ).addClass('open');
	}
});

// Tooltips
$('a').tooltip('hide');

// $(function(){
// 	$('#sidebar').css({'height':($(document).height())+'px'});
// 	$('.dashboard-wrapper').css({'height':($(document).height())+'px'});
// 	$(window).resize(function(){
// 		$('#sidebar').css({'height':($(document).height())+'px'});
// 		$('.dashboard-wrapper').css({'height':($(document).height())+'px'});
// 	});
// });