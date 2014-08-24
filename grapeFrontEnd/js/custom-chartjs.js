var $grid_color = "#fff";

var $dark_blue = "#005387";
var $info = "#87CEEB";
var $danger = "#F56B6B";
var $warning = "#F38733";
var $success = "#2ecc71";
var $yellow = "#fdd922";
var $facebook = "#3b5999";
var $twitter = "#00acee";
var $linkedin = "#1a85bd";
var $gplus = "#dc4937";


(function(){
  var t;
  function size(animate){
    if (animate == undefined){
      animate = false;
    }
    clearTimeout(t);
    t = setTimeout(function(){
      $("canvas").each(function(i,el){
        $(el).attr({
          "width":$(el).parent().width(),
          "height":$(el).parent().outerHeight()
        });
      });
      redraw(animate);
      var m = 0;
      $(".chartJS").height("");
      $(".chartJS").each(function(i,el){ m = Math.max(m,$(el).height()); });
      $(".chartJS").height(m);
      }, 30);
    }
  $(window).on('resize', function(){ size(false); });

  function redraw(animation){
    var options = {};
    if (!animation){
        options.animation = false;
    } else {
        options.animation = true;
    }
      
    // Custom chart Js code starts here

    // 1. Bar Charts
    var barChartData = {
      labels : ["Sachin","Nehwal","Yahoo","Google"],
      datasets : [
        {
          fillColor : $info,
          strokeColor : $info,
          data : [2181,3156,2755,3340]
        },
        {
          fillColor : $success,
          strokeColor : $success,
          data : [2165,2259,4190,2181]
        },
        {
          fillColor : $danger,
          strokeColor : $danger,
          data : [3389,5421,1672,2121]
        },
        {
          fillColor : $warning,
          strokeColor : $warning,
          data : [5541,2131,1123,3413]
        }
      ]
    }
    var myLine = new Chart(document.getElementById("barChart").getContext("2d")).Bar(barChartData);

    // 2 Line Chart
    var lineChartData = {
      labels : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      datasets : [
        {
          fillColor : $info,
          strokeColor : "#fff",
          pointColor : $yellow,
          pointStrokeColor : "#fff",
          scaleGridLineWidth : 1,
          data : [735,5359,3190,2781,1456,2755,940]
        },
        {
          fillColor : $dark_blue,
          strokeColor : "#fff",
          pointColor : $gplus,
          scaleGridLineWidth : 1,
          pointStrokeColor : "#fff",
          data : [1228,3248,1740,1519,296,327,1500]
        }
      ] 
    }
    var myLine = new Chart(document.getElementById("lineChart").getContext("2d")).Line(lineChartData);


    //3. Polar Area Chart
    var chartData = [
      {
        value : Math.random(),
        color: $yellow
      },
      {
        value : Math.random(),
        color: $info
      },
      {
        value : Math.random(),
        color: $success
      },
      {
        value : Math.random(),
        color: $warning
      },
      {
        value : Math.random(),
        color: $gplus
      },
      {
        value : Math.random(),
        color: $twitter
      }
    ];
    var myPolarArea = new Chart(document.getElementById("polarAreaChart").getContext("2d")).PolarArea(chartData);
  
    // 5. Pie Chart
    var pieData = [
      {
        value: 25,
        color: $danger
      },
      {
        value : 45,
        color : $facebook
      },
      {
        value : 10,
        color : $success
      },
      {
        value : 20,
        color : $warning
      }
    
    ];

    var myPie = new Chart(document.getElementById("pieChart").getContext("2d")).Pie(pieData);


    // 6. Doughnut
    // var doughnutData = [
    //   {
    //     value: 30,
    //     color: $yellow
    //   },
    //   {
    //     value : 50,
    //     color : $success
    //   },
    //   {
    //     value : 100,
    //     color : $info
    //   },
    //   {
    //     value : 40,
    //     color : $warning
    //   },
    //   {
    //     value : 120,
    //     color : $gplus,
    //   }
    
    // ];

    // var myDoughnut = new Chart(document.getElementById("doughnutChart").getContext("2d")).Doughnut(doughnutData);


    // 7. Doughnut 2
    var doughnutData = [
      {
        value: 30,
        color: $yellow
      },
      {
        value : 70,
        color : $success
      }
    
    ];

    var myDoughnut = new Chart(document.getElementById("doughnutChart2").getContext("2d")).Doughnut(doughnutData);

     // 8. Doughnut 3
    var doughnutData = [
      {
        value: 80,
        color: $danger
      },
      {
        value : 20,
        color : $success
      },
    
    ];

    var myDoughnut = new Chart(document.getElementById("doughnutChart3").getContext("2d")).Doughnut(doughnutData);



    // Custom chart Js code ends here


  }

  size(true);

}());