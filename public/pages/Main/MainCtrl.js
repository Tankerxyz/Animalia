myApp.controller('MainCtrl', function($rootScope, $scope, $http, $location) {
  $rootScope.adminCabinet = false;
  
  $scope.animalOfTheDay = null;
  $scope.mostPopularAnimals = [];
  $scope.page = 1;
  $scope.canShowMore = true;

  $http.get('/api/animal-of-the-day')
    .then(function(result) {
      $scope.animalOfTheDay = result.data;
      console.log(result);
    }, function(err) {
      console.log(err);
    });
  
  $scope.getMostPopularAnimals = function() {
    $http.get('/api/most-popular-animals/11/0/1')
      .then(function(result) {
        console.log(result);
        $scope.mostPopularAnimals.push.apply($scope.mostPopularAnimals, result.data);
        console.log($scope.mostPopularAnimals);
      }, function(err) {
        console.log(err);
      });
  };

  $scope.getMoreMostPopularAnimals = function(limit) {
    $http.get('/api/most-popular-animals/'+limit+'/11/' + $scope.page++)
      .then(function(result) {
        console.log(result);
        $scope.mostPopularAnimals.push.apply($scope.mostPopularAnimals, result.data);
        
        if (result.data.length < limit) {
          $scope.canShowMore = false;
        }
        console.log($scope.mostPopularAnimals);
      }, function(err) {
        console.log(err);
      });
  };

});