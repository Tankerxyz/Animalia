myApp.controller('AnimalsListCtrl', function($rootScope, $scope, $http) {
  $rootScope.adminCabinet = true;

  $scope.animals = undefined;

  $scope.editAnimal = undefined;  
  
  $scope.reg = {
    desc: /^[a-zA-Z0-9/W ]{6,10000}$/,
    name: /^[a-zA-Z0-9/W ]{6,50}$/,
    str: /^[a-zA-Z]{3,25}$/,
    url: /^[a-zA-Z0-9]{3,50}$/,
    title: /^[a-zA-Z ]{5,30}$/,
    number: /^[0-9]{1,8}$/,
    size: /\d{1,3}.\d{1,3}m - \d{1,3}.\d{1,3}m/,
    weight: /\d{1,6}kg - \d{1,6}kg/,
    lifeSpan: /\d{1,3} - \d{1,6} [\w]{1,10}/,
    speed: /\d{1,5} \w{1,10}\/\w{1,3}/,
    maturityAge: /\d{1,3} [\w]{1,10}/
  }
    
  $scope.isValid = function() {
    return (
      ($scope.editAnimal.url != undefined && $scope.reg.url.test($scope.editAnimal.url)) &&
      ($scope.editAnimal.title != undefined && $scope.reg.title.test($scope.editAnimal.title)) &&
      ($scope.editAnimal.sciTaxonomy.name != undefined && $scope.reg.name.test($scope.editAnimal.sciTaxonomy.name)) &&
      ($scope.editAnimal.sciTaxonomy.class != undefined && $scope.reg.str.test($scope.editAnimal.sciTaxonomy.class)) &&
      ($scope.editAnimal.sciTaxonomy.order != undefined && $scope.reg.str.test($scope.editAnimal.sciTaxonomy.order)) &&
      ($scope.editAnimal.sciTaxonomy.family != undefined && $scope.reg.str.test($scope.editAnimal.sciTaxonomy.family)) &&
      ($scope.editAnimal.sciTaxonomy.genus != undefined && $scope.reg.str.test($scope.editAnimal.sciTaxonomy.genus)) &&
      ($scope.editAnimal.characteristic.size != undefined && $scope.reg.size.test($scope.editAnimal.characteristic.size)) &&
      ($scope.editAnimal.characteristic.weight != undefined && $scope.reg.weight.test($scope.editAnimal.characteristic.weight)) &&
      ($scope.editAnimal.characteristic.lifeSpan != undefined && $scope.reg.lifeSpan.test($scope.editAnimal.characteristic.lifeSpan)) &&
      ($scope.editAnimal.characteristic.speed != undefined && $scope.reg.speed.test($scope.editAnimal.characteristic.speed)) &&
      ($scope.editAnimal.characteristic.biome != undefined && $scope.reg.str.test($scope.editAnimal.characteristic.biome)) &&
      ($scope.editAnimal.lifeStyle.diet != undefined && $scope.reg.str.test($scope.editAnimal.lifeStyle.diet)) &&
      ($scope.editAnimal.lifeStyle.nutrilion != undefined && $scope.reg.desc.test($scope.editAnimal.lifeStyle.nutrilion)) && 
      ($scope.editAnimal.lifeStyle.mattingHabbits != undefined && $scope.reg.desc.test($scope.editAnimal.lifeStyle.mattingHabbits)) &&
      ($scope.editAnimal.lifeStyle.maturityAge != undefined && $scope.reg.maturityAge.test($scope.editAnimal.lifeStyle.maturityAge)) &&
      ($scope.editAnimal.lifeStyle.pregnancy != undefined && $scope.reg.number.test($scope.editAnimal.lifeStyle.pregnancy)) &&
      ($scope.editAnimal.lifeStyle.reproduction != undefined && $scope.reg.str.test($scope.editAnimal.lifeStyle.reproduction)) &&
      ($scope.editAnimal.population.status != undefined && $scope.reg.str.test($scope.editAnimal.population.status)) && 
      ($scope.editAnimal.population.number != undefined && $scope.reg.number.test($scope.editAnimal.population.number)) &&
      ($scope.editAnimal.population.threats != undefined && $scope.reg.desc.test($scope.editAnimal.population.threats)) &&
      ($scope.editAnimal.population.hunting != undefined && $scope.reg.desc.test($scope.editAnimal.population.hunting))
    )
  }
  

  var getAnimals = function() {
    if ($rootScope.user.usertype !== 3) {
      $http.get('/api/animals')
        .then(function(result) {

          if (result.data.success) {
            $scope.animals = result.data.data;
          }
        }, function(err) {
          console.error(err);
        })
    }
  };

  getAnimals();



  $scope.delete = function($index) {
    var id = $scope.animals[$index]._id;

    $http.delete('/api/animal/' + id)
      .then(function(result) {
        if (result.data.success) {
          $scope.animals.splice($index, 1);
        }
      }, function(err) {
        console.error(err);
      })
  };


  $scope.create = function() {
    $scope.editAnimal = {
      url: "",
      title: "",
      sciTaxonomy: {
        name: "",
        class: "",
        order: "",
        family: "",
        genus: "",
      },
      characteristic: {
        size: "",
        weight: "",
        lifeSpan: "",
        speed: "",
        biome: ""
      },
      lifeStyle: {
        diet: "",
        nutrilion: "",
        mattingHabbits: "",
        maturityAge: 0,
        pregnancy: 0,
        reproduction: ""
      },
      population: {
        status: "",
        number: 0,
        threats: "",
        hunting: ""
      },
      facts: [""]
    };
  };

  $scope.edit = function(animal) {
    $http.get('/api/animal/' + animal._id)
      .then(function(result) {
        if (result.data.success) {
          console.log(result);
          $scope.editAnimal = result.data.data;
        }
      }, function(err) {
        console.error(err);
      })
  };

  $scope.saveEdit = function() {
    console.log($scope.editAnimal);
    
    if ($scope.editAnimal._id) {
      $http.put('/api/animal/' + $scope.editAnimal._id, $scope.editAnimal)
        .then(function(result) {
          if (result.data.success) {
            getAnimals();
          }
        }, function(err) {
          console.error(err);
        });
    } else {
      $http.post('/api/animal/', $scope.editAnimal)
        .then(function(result) {
          if (result.data.success) {
            getAnimals();
          }
        }, function(err) {
          console.error(err);
        });
    }
  };




  $scope.getRandom = function() {

    function getRandStr(numb) {
      return Math.random().toString(36).substring(numb);
    }

    function getRandNumb(numb) {
      var n = 1;
      for (var i = 0; i < numb; ++i) {
        n *= 10;
      }
      return Math.floor(Math.random() * n);
    }

    $scope.editAnimal = {
      url: getRandStr(7),
      title: getRandStr(7),
      sciTaxonomy: {
        name: 'aoeuaoeu',
        class: 'aoeuaoeu',
        order: 'aoeuaoeu',
        family: 'aoeuaoeu',
        genus: 'aoeuaoeu',
      },
      characteristic: {
        size: '1.1m - 1.1m',
        weight: '1kg - 5kg',
        lifeSpan: '12 - 15 years',
        speed: '12 km/h',
        biome: 'aoeuaoeu'
      },
      lifeStyle: {
        diet: 'aoeuaoeu',
        nutrilion: 'aoeuaoeu',
        mattingHabbits: 'aoeuaoeu',
        maturityAge: '11 aoeu',
        pregnancy: getRandNumb(2),
        reproduction: 'aoeuaoeu'
      },
      population: {
        status: 'aoeuaoeu',
        number: getRandNumb(2),
        threats: 'aoeuaoeu',
        hunting: 'aoeuaoeu'
      },
      facts: [getRandStr(7), getRandStr(7), getRandStr(7)]
    };
  }
});