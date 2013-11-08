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
                  var date = moment(by_hour.time);
                  return {
                    x: date.get('date'),
                    y: by_hour.count,
                    hour: date.get('hour')
                  };
                })
                .groupBy(function (d) {
                  return d.hour;
                })
                .map(function (arr) {
                  return {
                    key: arr[0].hour,
                    values: arr
                  };
                })
                .value();
      });
    },

    hitsByResponseCode: function () {
      return $http.post(searchUrl, {
        "query": {
            "match_all": {}
        },
        "facets": {
            "hits_by_response_code": {
              "histogram": {
                  "field": "responsecode",
                  "interval": 1
              }
            }
        }
      }).then(function (response) {
        return response.data.facets.hits_by_response_code.entries;
      });
    }

  };

  return service;
});
