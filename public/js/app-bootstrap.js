var Routes = {
  hitsperhour: 'hitsperhour.html',
  two: 'two.html',
  response: 'response.html'
};

app.value('Routes', Routes);

app.config(function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      controller: HitsPerHourController,
      templateUrl: 'partials/' + Routes.hitsperhour
    })

  var routeControllerMap = {};
  routeControllerMap[Routes.hitsperhour] = HitsPerHourController;
  routeControllerMap[Routes.two] = TwoController;
  routeControllerMap[Routes.response] = ResponseController;

  _.forEach(routeControllerMap, function (controller, route) {
    $routeProvider
      .when('/' + route, {
        controller: controller,
        templateUrl: 'partials/' + route
      });
  });
});
