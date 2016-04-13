myApp.controller('PhotosUploadCtrl', function($rootScope, $scope, $http, $location, $routeParams) {
  $rootScope.adminCabinet = true;

  function setLoading() {
    var upload = angular.element(document.querySelector('#upload'));
    upload.addClass('disabled');
    upload.attr('disabled', true);
    upload.html('Loading...');
  }

  function resetLoading() {
    var upload = angular.element(document.querySelector('#upload'));
    upload.removeClass('disabled');
    upload.removeAttr('disabled');
    upload.html('Upload');
  }

  function updateProgressBar() {
    var progressBar = document.querySelector('#progressBar');
    var percent = ((100 / $scope.length) * (($scope.length - $scope.files.length) + 1));
    progressBar.style.width = percent + '%';
  }

  $scope.animalId = $routeParams.id;

  $scope.uploadedCount = 0;

  $scope.files = [];

  $scope.inputFiles = [];

  $scope.length = null;

  $scope.loaded = false;


  $scope.remove = function($index) {
    $scope.files.splice($index, 1);
  };

  $scope.uploadFiles = function() {
    var files = angular.copy($scope.files);
    if (files.length === 0) {
      $window.alert('Please select files!');
      return false;
    }

    setLoading();

    $scope.length = files.length;

    async.eachSeries(files.reverse(), function(file, callback) {

      async.waterfall([
        function(callback) {
          $http.post('/api/photos/' + $scope.animalId, file)
            .then(function(result) {

              callback(null, result.data.message);
            }, function(err) {
              console.log(err);
              
              resetLoading();
              $scope.length = null;
              callback(true);
            });
        },
        function(deletedIndex, callback) {
          updateProgressBar();

          $scope.files.splice(deletedIndex, 1);

          callback(null);
        }
      ], function(err, results) {
        callback(null);
      });
    }, function done() {
      console.log($scope.files);
      console.log($scope.files.length);

      if ($scope.files.length == 0) {
        window.location.pathname = ('/photos-list/' + $scope.animalId);
      } else {
        updateProgressBar();
        resetLoading();
      }
    });
  };

  $scope.onchange = function() {
    $scope.loaded = true;
  };

  $scope.onChangeHandlerFunc = function() {
    $scope.loaded = false;

    for (var i = 0; i < $scope.inputFiles.length; ++i) {
      $scope.files.push({
        index: $scope.files.length
        ,
        info: {
          age: '',
          conditions: [],
          geography: [],
          place: ''
        },
        file: $scope.inputFiles[i]
      });
    }

    console.log($scope.files);

    $scope.inputFiles = [];

    document.querySelector("input[type='file']").value = '';
  }

  $scope.getBase64SrcStr = function(el) {
    return 'data:' + el.filetype + ';base64,' + el.base64;
  }

  $scope.getRandom = function() {

    function getRandStr(numb) {
      return Math.random().toString(36).substring(numb);
    }

    for (var i = 0; i < $scope.files.length; ++i) {
      $scope.files[i].info.age = getRandStr(5);
      $scope.files[i].info.place = getRandStr(5);
      $scope.files[i].info.geography = [getRandStr(5), getRandStr(5)];
      $scope.files[i].info.conditions = [getRandStr(5), getRandStr(5)];
    }
  }

});