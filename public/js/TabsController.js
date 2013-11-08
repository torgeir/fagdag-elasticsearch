function TabsController ($scope, $location, Routes) {
  $scope.Routes = Routes;
  $scope.$on('$routeChangeStart', setActive);
  setActive();

  function setActive () {
    var path = $location.path().replace(/^\//, '');
    $scope.hitsperhourActive = (path == '' || path == Routes.hitsperhour);
    $scope.twoActive = (path == Routes.two);
    $scope.responseActive = (path == Routes.response);
  }
}

