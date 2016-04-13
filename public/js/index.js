var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/category', {
    templateUrl: 'views/category.html'
  });
  $routeProvider.when('/animals-list', {
    templateUrl: 'views/animalsList.html'
  });
  $routeProvider.when('/animal-edit', {
    templateUrl: 'views/animalEdit.html'
  });
  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'js/controllers/loginCtrl'
  });
  $routeProvider.otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode(true);
  angular.extend(toastrConfig, {
    allowHtml: true,
  });
});
