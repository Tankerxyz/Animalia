myApp.controller('AnimalCtrl', function($rootScope, $scope, $http, $routeParams, $location) {
  $.support.transition = false

  $rootScope.adminCabinet = false;
  $scope.animal = null;
  $scope.activePhoto = null;

  if ($routeParams.url) {
    getAnimal('/api/animal/url/' + $routeParams.url)
  }

  $scope.setActivePhoto = function(index) {
    $scope.activePhoto = $scope.animal.photos[index];
  };

  $scope.goToSlider = function(id) {
    $location.path('/animal/' + $scope.animal.url + '/photos/' + id)
  };

  function getAnimal(url) {
    $http.get(url)
      .then(function(result) {
        $scope.animal = result.data.message;
        console.log($scope.animal);

        getPhotos('/api/animals/' + $scope.animal._id + '/photos');
      }, function(err) {
        console.log(err);
      });
  }
  function getPhotos(url) {
    $http.get(url)
      .then(function(result) {
        $scope.animal.photos = result.data.data;
        console.log($scope.animal.photos);
      }, function(err) {
        console.log(err);
      });
  }

  $scope.hide = function($event) {
    $event.target.style.display = 'none';
  }
});