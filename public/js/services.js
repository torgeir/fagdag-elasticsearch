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
        return response.data.facets.hits_by_hour.entries;
      })
    }
  };

  return service;
});
