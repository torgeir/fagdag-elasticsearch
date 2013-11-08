function log (what) {
  console.log(what);
}

function OneController ($scope, es) {
  $scope.hitsPerHour = [];

  es.hitsPerHour().then(function () {
    log(arguments);
  });
}
