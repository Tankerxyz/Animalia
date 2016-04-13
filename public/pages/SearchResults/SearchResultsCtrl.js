myApp.controller('SearchResultsCtrl', function($rootScope, $scope, $http, $routeParams) {
  $rootScope.adminCabinet = false;
  
  console.log($scope.finder);
  
  $scope.finder = null;
  $scope.str = $routeParams.str;
  $scope.results = null;

  if ($scope.str) {
    $http.get('/api/find-all-min/' + $scope.str)
      .then(function(result) {
        $scope.results = result.data;

        console.log($scope.results);
      }, function(err) {
        console.log(err);
      });
  }
});