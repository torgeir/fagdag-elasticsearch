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

    .when('/', {
      templateUrl: 'partials/' + Routes.one
    })

    .when(Routes.one, {
      templateUrl: 'partials/' + Routes.one
    })

    .when(Routes.two, {
      controller: TwoController,
      templateUrl: 'partials/' + Routes.two
    })

});

