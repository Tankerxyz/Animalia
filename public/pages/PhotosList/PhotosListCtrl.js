myApp.controller('PhotosListCtrl', function($rootScope, $scope, $http, $location, $routeParams) {
  $rootScope.adminCabinet = true;

  $scope.animalId = $routeParams.id;
  $scope.editPhoto = {};
  $scope.photos = [];

  if ($rootScope.user && $rootScope.user.usertype !== 3) {
    if ($scope.animalId) {
      $http.get('/api/animals/' + $scope.animalId + '/photos')
        .then(function(data) {
          if (data.data.success) {

            data.data.data.forEach(function(el) {
              $scope.photos.push(el);
            });
            console.log($scope.photos);
          }
        }, function(err) {
          console.error(err);
        })
    }
  }
  
  $scope.upload = function() {
    $location.path('/photos-upload/'+$scope.animalId);
  };

  $scope.edit = function(photo) {
    
    $http.get('/api/animals/'+$scope.animalId+'/photos/'+photo.id)
      .then(function(result) {
        $scope.editPhoto = result.data.message;
        console.log($scope.editPhoto);
      }, function (err) {
        console.error(err);
      });    
  };
  
  $scope.saveEdit = function() {
    $http.put('/api/animal/'+$scope.animalId+'/photo/'+$scope.editPhoto._id, $scope.editPhoto.info)
      .then(function(result) {
        if (result.data.success) {
          console.log('Well Done');
        } else {
          console.log('Nope...');
        }
      }, function (err) {
        console.error(err);
      });   
  };

  $scope.remove = function(id) {
    $http.delete('/api/animal/'+$scope.animalId+'/photo/' + id)
      .then(function(data) {
        if (data.data.success) {
          for (var i = 0; i < $scope.photos.length; ++i) {
            if ($scope.photos[i].id === id) {
              $scope.photos.splice(i, 1)
              break;
            }
          }
        }
      }, function(err) {
        console.error(err);
      })
  };

  $scope.removeAll = function() {
    
    console.log($scope.photos);
    
    $http.post('/api/'+$scope.animalId, $scope.photos)
      .then(function(result) {
        if (result.data.success) {
          result.data.message.forEach(function(el) {
            for(var i = 0; i < $scope.photos.length; ++i) {
              if (el.id == $scope.photos[i].id) {
                $scope.photos.splice(i, 1);
              }
            }
          });
        } else {
          console.log('Nope...');
        }
      }, function(err) {
        console.error(err);
      })
  };
});