var Routes = {
  hitsperhour: 'hitsperhour.html',
  two: 'two.html'
};

app.value('Routes', Routes);

app.config(function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider

    .when('/', {
      controller: HitsPerHourController,
      templateUrl: 'partials/' + Routes.hitsperhour
    })

    .when('/' + Routes.hitsperhour, {
      controller: HitsPerHourController,
      templateUrl: 'partials/' + Routes.hitsperhour
    })

    .when('/' + Routes.two, {
      controller: TwoController,
      templateUrl: 'partials/' + Routes.two
    })
});
