
myApp.controller('SliderCtrl', function($rootScope, $scope, $http, $location, $routeParams) {
  $rootScope.adminCabinet = false;
  $scope.activePhoto = null;
  $scope.animal = null;


  if ($routeParams.url) {
    getAnimal('/api/animal/url/' + $routeParams.url)
  }

  $scope.setActivePhoto = function(index) {
    $scope.activePhoto = $scope.animal.photos[index];
  }
  
  
  $scope.download = function() {
    window.location.pathname = document.querySelector('.item.active').innerHTML.match('<img.*ng-src="(.*?)"')[1];
  }
  

  function getAnimal(url) {
    $http.get(url)
      .then(function(result) {
        $scope.animal = result.data.message;
        console.log(result);
        console.log($scope.animal);

        getPhotos('/api/animals/' + $scope.animal._id + '/photosAll');
      }, function(err) {
        console.log(err);
      });
  }
  function getPhotos(url) {
    $http.get(url)
      .then(function(result) {
        $scope.animal.photos = result.data.data;
        
                
        $scope.animal.photos.forEach(function(el) {
          if (el._id == $routeParams.idPhoto) {
            $scope.activePhoto = el;
          }
        });
        
        
        console.log($scope.animal.photos);
        console.log($scope.activePhoto);
      }, function(err) {
        console.log(err);
      });
  }


});