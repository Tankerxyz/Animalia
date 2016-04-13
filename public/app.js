var myApp = angular.module('myApp', ["ngRoute", "door3.css", "naif.base64"]);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/Main/Main.html',
      controller: 'MainCtrl',
      css: 'pages/Main/Main.css'
    })
    .when('/animals-list', {
      templateUrl: 'pages/AnimalsList/AnimalsList.html',
      controller: 'AnimalsListCtrl',
      css: 'pages/AnimalsList/AnimalsList.css'
    })
    .when('/logout', {
      templateUrl: 'pages/Logout/Logout.html',
      controller: 'LogoutCtrl'
    })
    .when('/photos-list/:id', {
      templateUrl: 'pages/PhotosList/PhotosList.html',
      controller: 'PhotosListCtrl',
      css: 'pages/PhotosList/PhotosList.css'
    })
    .when('/photos-upload/:id', {
      templateUrl: 'pages/PhotosUpload/PhotosUpload.html',
      controller: 'PhotosUploadCtrl',
      css: 'pages/PhotosUpload/PhotosUpload.css'
    })
    .when('/users-list', {
      templateUrl: 'pages/UsersList/UsersList.html',
      controller: 'UsersListCtrl',
      css: 'pages/UsersList/UsersList.css'
    })
    .when('/search/:str', {
      templateUrl: 'pages/SearchResults/SearchResults.html',
      controller: 'SearchResultsCtrl',
      css: 'pages/SearchResults/SearchResults.css'
    })
    .when('/animal/:url/photos/:idPhoto', {
      templateUrl: 'pages/Slider/Slider.html',
      controller: 'SliderCtrl',
      css: 'pages/Slider/Slider.css'
    })
    .when('/animal/:url', {
      templateUrl: 'pages/Animal/Animal.html',
      controller: 'AnimalCtrl',
      css: 'pages/Animal/Animal.css'
    })    
    .otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode(true);

})
  .run(function($rootScope, $http, $location) {
    
    $rootScope.goSearch = function(finder) {
      var url = '/search/' + finder.str;
      resetData(finder);      
      $location.path(url);
    };

    $rootScope.getSubArray = function(array, start, end) {
      if (array) {
        return end ? array.slice(start, end) : array.slice(start); 
      }
    };
    
    $rootScope.resetResusts = function(finder) {
      resetData(finder);
    };

    $rootScope.search = function(finder) {

      if (finder.str) {
        $http.get('/api/find/' + finder.str + '/4')
          .then(function(result) {
            if (result.data.success) {
              finder.results = result.data.message;
            }
            console.log(result);
          }, function(err) {
            if (err.status === 404) {
              finder.results = null;
            }
          });
      } else {
        finder.results = null;
      }
    };


    $rootScope.login = function(data) {
      $http.post('/api/login', { username: data.login, password: data.password })
        .then(function(result) {
          $rootScope.user = result.data;
          resetData(data);
          $('#myModal').modal('hide');
        },
        function(err) {
          resetData(data);
          console.error(err);
        });
    };

    $rootScope.logout = function() {
      $http.get('/api/logout')
        .then(function () {
          $location.path('/');
          $rootScope.user = undefined;
        }, function (err) {
          console.error(err);
        });
    };

    $rootScope.register = function(data) {
      if (data.password === data.repeatPassword) {
        $http.post('/api/register', { username: data.login, password: data.password })
          .then(function(result) {
            if (result.data.success === true) {
              $rootScope.login(data);
              $('#myModal').modal('hide');
            }
              resetData(data);            
          }, function(err) {
            resetData(data);
            console.error(err);
          });
      }
    };

    $http.get('/api/auth').then(function(result) {
      $rootScope.user = result.data || undefined;
    });
  })
  .filter('smallDate', function() {
    return function(str) {
      var date = new Date(str);
      return date.toDateString().slice(4);
    }
  })
  .filter('getStrFromArray', function() {
    return function(array) {      
      return array.join(', ');;
    }
  })


function resetData(data) {
  for (var i in data) {
    data[i] = null;
  }
}
