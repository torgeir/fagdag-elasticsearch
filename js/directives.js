app.directive('ngHistogram', function () {

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      var width = 900, height = 300, pad = 20, leftPad = 100, gap = 0.1;

      var x = d3.scale.ordinal().rangeRoundBands([leftPad, width - pad], gap);
      var y = d3.scale.linear().range([height-pad, pad]);

      var xAxis = d3.svg.axis().scale(x).orient('bottom');
      var yAxis = d3.svg.axis().scale(y).orient('left');

      var svg = d3.select(element.get(0))
                    .append('svg')
                      .attr("width", "100%")
                      .attr("height", "100%")
                      .attr("viewBox", "0 0 " + width + " " + height); // 0 0 900 300

      d3.json(attrs.ngHistogram, function (data) {

        data = d3.keys(data).map(function (key) {
          return { bucket: Number(key), N: data[key] };
        });

        x.domain(data.map(function (d) {
          return d.bucket;
        }));

        var max = d3.max(data, function (d) { return d.N; })
        y.domain([0, max]);

        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0, ' + (height-pad) + ')')
            .call(xAxis);

        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + (leftPad-pad) + ', 0)')
            .call(yAxis);

        var rects = svg.selectAll('rect')
              .data(data)
              .enter()
              .append('rect')
                .attr('class', 'bar')
                .attr('x', function (d) { return x(d.bucket) })
                .attr('width', x.rangeBand())
                .attr('y', attrs.animate ? height-pad : function (d) { return y(d.N) })
                .attr('height', function (d) { return height-pad - y(d.N) })
                .transition()
                  .delay(function (d) { return d.bucket * 20 })
                  .duration(800)
                  .attr('y', function (d) { return y(d.N) })
                  .attr('height', function (d) { return height-pad - y(d.N) });

        setInterval(function () {
          for (var key in data) {
            data[key].N = parseInt(Math.random() * max, 10);
          }

          svg.selectAll('rect')
              .data(data)
              .transition()
              .attr('y', function (d) { return y(d.N) })
              .attr('height', function (d) { return height-pad - y(d.N) })
        }, 1000)
      });
    }
  };
})
