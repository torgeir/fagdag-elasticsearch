
function HitsPerHourController ($scope, es) {
  $scope.hitsPerHour = [];

  es.hitsPerHour().then(function (data) {
    nv.addGraph(function() {
      var chart = nv.models.stackedAreaChart();
      chart.xAxis
          .tickFormat(function (date, index) {
            return moment(date).format('YYYY.MM.DD');
          });

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
