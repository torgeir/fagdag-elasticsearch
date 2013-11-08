
function HitsPerHourController ($scope, es) {
  $scope.hitsPerHour = [];

  es.hitsPerHour().then(function (data) {
    nv.addGraph(function() {
      var chart = nv.models.multiBarChart();
      chart.xAxis
          .tickFormat(d3.format(',f'));

      chart.yAxis
          .tickFormat(d3.format(',.1f'));

      d3.select('.one-graph svg')
          .datum(data)
          .transition().duration(500).call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });

  });
}
