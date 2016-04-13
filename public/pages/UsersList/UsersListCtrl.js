myApp.controller('UsersListCtrl', function($rootScope, $scope, $http) {
  $rootScope.adminCabinet = true;

  var getUsersList = function() {
    if ($rootScope.user.usertype !== 3) {

      //get all users
      $http.get('/api/users')
        .then(function(result) {

          if (result.data.success) {
            $scope.users = result.data.message;
          }
          console.log(result);
        }, function(err) {
          console.error(err);
        });
    }
  };

  getUsersList();

  $scope.users = undefined;

  $scope.editUser = undefined;

  $scope.create = function() {
    $scope.editUser = {
      username: "",
      usertype: 3,
      password: ""
    };
  };
  
  $scope.reg = {
    login: /^[a-zA-Z][a-zA-Z0-9-_\.]{4,20}$/,
    password: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
  };
  
  $scope.isValid = function() {
    return (
      ($scope.editUser.username != undefined && $scope.reg.login.test($scope.editUser.username)) &&
      ($scope.editUser.password == '' || $scope.reg.password.test($scope.editUser.password))
    )
  };
  
  $scope.getClass = function(user) {
    return user.usertype == 1 ? 'admin' : user.usertype == 2 ? 'cmanager' : 'user'; 
  };

  $scope.edit = function(user) {
    $http.get('/api/user/' + user._id)
      .then(function(result) {
        $scope.editUser = result.data.message;
        $scope.editUser.password = '';
        console.log($scope.editUser);
      }, function(err) {
        console.error(err);
      });
  };

  $scope.saveEdit = function() {

    if (!$scope.editUser._id) {
      $http.post('/api/user/' + $scope.editUser._id, $scope.editUser)
        .then(function(result) {
          if (result.data.success) {
            getUsersList();

            console.log('Well Done');
          } else {
            console.log('Nope...');
          }
        }, function(err) {
          console.error(err);
        });
    } else {
      $http.put('/api/user/' + $scope.editUser._id, $scope.editUser)
        .then(function(result) {
          if (result.data.success) {
            getUsersList();

            console.log('Well Done');
          } else {
            console.log('Nope...');
          }
        }, function(err) {
          console.error(err);
        });
      $scope.editUser = undefined;
    }
  }


  $scope.delete = function($index) {
    var id = $scope.users[$index]._id;

    $http.delete('/api/user/' + id)
      .then(function(data) {
        if (data.data.success) {
          $scope.users.splice($index, 1);
        }
        console.log(data);
      }, function(err) {
        console.error(err);
      })
  }

});