function OneController ($scope, es) {
  $scope.hitsPerHour = [];

  es.hitsPerHour().then(function () {
    console.log(arguments);
  });
}
