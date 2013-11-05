var Routes = {
  one: '/one.html',
  two: '/two.html'
};

var app = angular.module('leanmean', []);

app.value('Routes', Routes);

app.config(function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  //$rootScope.$on('$afterRouteChange', function(){
    //$window.scrollTo(0,0);
  //});

  $routeProvider
    .when('/',        route(Routes.one, 'OneController'))
    .when(Routes.one, route(Routes.one, 'OneController'))
    .when(Routes.two, route(Routes.two, 'TwoController'))

});

var controllerCache = [];
function route (template, controller) {
  var route = {
    templateUrl: 'partials' + template
  };

  if (controller) {
    route.controller = controller;

    route.resolve = {
      delay: function ($q, $http) {
        var deferred = $q.defer();
        if (controllerCache.indexOf(controller) !== -1) {
          deferred.resolve();
        }
        else {
          $http.get('js/controllers/' + controller + '.js').then(function (response) {
            controllerCache.push(controller);
            evalInHead(response.data),
            deferred.resolve();
          });
        }
        return deferred.promise;
      }
    };
  }

  return route;
}

var head = document.getElementsByTagName('head')[0];
function evalInHead (content) {
  var script = document.createElement('script');
  script.appendChild(document.createTextNode(content));
  head.appendChild(script);
}
