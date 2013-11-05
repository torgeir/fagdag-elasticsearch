console.log('app load');
var app = angular.module('leanmean', []);

app.config(function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  //$rootScope.$on('$afterRouteChange', function(){
    //$window.scrollTo(0,0);
  //});

  $routeProvider

    .when('/', {
      controller:  OneController,
      templateUrl: 'partials/one'
    })

    .when('/one', {
      controller:  OneController,
      templateUrl: 'partials/one'
    })

    .when('/two', {
      controller:  TwoController,
      templateUrl: 'partials/two'
    })

});

function OneController () {
  console.log('OneController');
}
function TwoController () {
  console.log('TwoController');
}
