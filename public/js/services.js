app.factory('es', function ($http) {
  var baseUrl = 'http://localhost:9200';
  var searchUrl = baseUrl + '/_search';
  var service = {
    hitsPerHour: function () {
      return $http.post(searchUrl, {
        "query": {
            "match_all": {}
        },
        "facets": {
            "hits_by_hour": {
              "date_histogram": {
                  "field": "timestamp",
                  "interval": "hour"
              }
            }
        }
      }).then(function (response) {
        var data = response.data.facets.hits_by_hour.entries;
				return _.chain(data)
                .map(function(by_hour) {
                  return {
                    y: by_hour.count,
		    x: moment(by_hour.time).format('YYYY-MM-DD'), 
                    time: moment(by_hour.time)
                  };
                })
                .groupBy(function(by_date) {
                  return by_date.time.hour();
                })
                .value();
      })
    }
  };

  return service;
});
