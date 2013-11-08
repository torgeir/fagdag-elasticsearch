app.factory('es', function ($http) {

  var baseUrl = 'http://localhost:9200';
  var searchUrl = baseUrl + '/_search';

  var service = {
    hitsPerHour: function () {
      return $http.post(searchUrl, {
        "query" : {
          "match_all": {}
        },
        "facets" : {
          "hits_by_hour" : {
            "date_histogram" : {
              "field" : "timestamp",
              "interval" : "hour"
            }
          }
        }
      }).then(function (response) {
        var data = response.data.facets.hits_by_hour.entries;
        return _.chain(data)
              .map(function(by_hour) {
                var date = moment(by_hour.time);
                date.add('hours', date.zone()/60);
                return {
                  x: date.clone().startOf('day').toDate(),
                  y: by_hour.count,
                  hour: date.get('hour'),
                  date: date.format('YYYY.MM.DD')
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
              //.forEach(log)
              .value();
      });
    },

    hitsByResponseCode: function (month, dayOfMonth, startHour, endHour) {
      return $http.post(searchUrl, {
        "query": {
          "match_all": {}
        },
        "facets": {
          "response_codes": {
            "terms": {
              "field": "responsecode"
            },
            "facet_filter": {
              "and": {
                "filters": [
                  {
                    "term": {
                      "monthofyear": month
                    }
                  },
                  {
                    "term": {
                      "dayofmonth": dayOfMonth
                    }
                  },
                  {
                    "range": {
                      "hourofday": {
                        "from": startHour,
                        "to": endHour
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }).then(function (response) {
        return response.data.facets.response_codes.terms;
      });
    },

    protocolVersion: function () {
      return $http.post(searchUrl, {
        "query" : {
            "match_all": {}
        },
        "facets" : {
            "httpprotocol": {
                "terms" : {
                    "field": "protocol"
                }
            }
        }
      }).then(function (response) {
        return response.data.facets.httpprotocol.terms;
      }).then(function (terms) {
        return terms.filter(function (term) {
          return term.term == '1.0' || term.term == '1.1';
        });
      });
    }

  };

  return service;
});

function log (what) {
  console.log(what);
}
