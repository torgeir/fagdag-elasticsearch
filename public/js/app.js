var app = angular.module('leanmean', []);

app.config(function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  //$rootScope.$on('$afterRouteChange', function(){
    //$window.scrollTo(0,0);
  //});

  $routeProvider

    .when('/', {
      templateUrl: 'partials/one'
    })

    .when('/one', {
      templateUrl: 'partials/one'
    })

    .when('/two', {
      controller: TwoController,
      templateUrl: 'partials/two'
    })

});

function TabsController ($scope, $location) {
  $scope.oneActive = $location.path() == '/one';
  $scope.twoActive = $location.path() == '/two';
}

function TwoController () {

   nv.addGraph(function() {
   var chart = nv.models.lineChart();

   chart.xAxis
       .axisLabel('Time (ms)')
       .tickFormat(d3.format(',r'));

   chart.yAxis
       .axisLabel('Voltage (v)')
       .tickFormat(d3.format('.02f'));

   d3.select('.tabs-two svg')
       .datum(sinAndCos())
     .transition().duration(500)
       .call(chart);

   nv.utils.windowResize(function() { d3.select('.tabs-two svg').call(chart) });

   return chart;
 });

 /**************************************
  * Simple test data generator
  */


 function sinAndCos() {
   var sin = [],
       cos = [];

   for (var i = 0; i < 100; i++) {
     sin.push({x: i, y: Math.sin(i/10)});
     cos.push({x: i, y: .5 * Math.cos(i/10)});
   }

   return [
     {
       values: sin,
       key: 'Sine Wave',
       color: '#ff7f0e'
     },
     {
       values: cos,
       key: 'Cosine Wave',
       color: '#2ca02c'
     }
   ];
 }
}
