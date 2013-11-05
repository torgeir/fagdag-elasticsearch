function TabsController ($scope, $location, Routes) {
  $scope.Routes = Routes;
  $scope.$on('$routeChangeStart', setActive);
  setActive();

  function setActive () {
    var path = $location.path();
    $scope.oneActive = (path == '/' || path == Routes.one);
    $scope.twoActive = (path == Routes.two);
  }
}

