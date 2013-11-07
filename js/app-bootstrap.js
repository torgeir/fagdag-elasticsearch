var Routes = {
  one: 'one.html',
  two: 'two.html'
};

app.value('Routes', Routes);

app.config(function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  //$rootScope.$on('$afterRouteChange', function(){
    //$window.scrollTo(0,0);
  //});

  $routeProvider

    .when('/', {
      controller: OneController,
      templateUrl: 'partials/' + Routes.one
    })

    .when('/' + Routes.one, {
      controller: OneController,
      templateUrl: 'partials/' + Routes.one
    })

    .when('/' + Routes.two, {
      controller: TwoController,
      templateUrl: 'partials/' + Routes.two
    })
});
