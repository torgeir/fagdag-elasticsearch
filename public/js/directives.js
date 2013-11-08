app.directive('ngStackedHistogram', function(es) {
  console.log("Running directive");
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      es.hitsPerHour().then(function(data) {
        nv.addGraph(function() { 
          var chart = nv.models.stackedAreaChart()
            .x(function(d) { return d.time.toDate() })
            .y(function(d) { return d.y })
            .clipEdge(true);
  
          chart.xAxis
            .tickFormat(function(date, index) {
		return moment(date).format('YYYY-MM-DD');
	    });
 
          chart.yAxis
            .tickFormat(d3.format("d"));
 
          d3.select(element.get(0)).append('svg')
            .datum(data)
            .transition().duration(500).call(chart);
 
          nv.utils.windowResize(chart.update);
          return chart;
        });
      }); 
    }
  }
});

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

        var mean = data.reduce(function (sum, d) { return sum + d.N; }, 0) / data.length;
        var meanLine = svg.append('line')
              .attr('class', 'mean')
              .attr('x1', x(0))
              .attr('x2', x(data.length - 1) + x.rangeBand())
              .attr('y1', y(mean))
              .attr('y2', y(mean));

        setInterval(function () {
          for (var key in data) {
            data[key].N = parseInt(Math.random() * max, 10);
          }

          svg.selectAll('rect')
              .data(data)
              .transition()
              .duration(1000)
              .attr('y', function (d) { return y(d.N) })
              .attr('height', function (d) { return height-pad - y(d.N) })

          mean = data.reduce(function (sum, d) { return sum + d.N; }, 0) / data.length;
          meanLine
            .transition()
              .attr('y1', y(mean))
              .attr('y2', y(mean));
        }, 2000)
      });
    }
  };
});

app.directive('ngPie', function (es) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var svg = d3.select(element.get(0))
            .append('svg')
            .attr("width", "100%")
            .attr("height", "100%");

      es.hitsByResponseCode().then(function (data) {
        var totalHits = _.reduce(data, function (sum, d) { return sum + d.count}, 0)
            angle = 0,
            color = d3.rgb(0, 0, 0)
            innerRadius = 40,
            outerRadius = 100;

        var arcData = _.map(data, function (item) {
          var share = item.count / totalHits * (2 * Math.PI);

          var arc =  d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(angle)
            .endAngle(angle + share);

          angle += share;
          return arc;
        });

        _.forEach(arcData, function (arc) {
          svg
            .append('path')
              .attr('d', arc)
              .attr('fill', color.toString())
              .attr('transform', 'translate(100,100)');

          color = color.brighter(0.5);
        });
      });
    }
  };
});
