var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope, $http, $rootScope, $animate) {
  $http.get('https://swapi.co/api/planets/?format=json').success(function(resp){
    var pNames = resp.results
    $scope.planets = pNames;
    $scope.click = function(num){
      $scope.clicked = num;
      var str = pNames[num].residents;
      str = str.map(function(x,i,arr){
        return x.match(/([0-9]+)/)
      })
      console.log(str)
      $rootScope.reses = str;
      $scope.res = $scope.planets[num].residents.length
    }
    $scope.hideStuff = function () {
        $scope.startFade = true;
        $timeout(function(){
            $scope.hidden = true;
        }, 2000);
        
    };
  });
});




app.directive('swampiResident',function() {
  return {
    scope: {
      id: '@'
    },
    templateUrl: function(elem, attr) {
      scope = attr.id

      return "selector.html"
    },
    controller: function($scope, $rootScope, $http) {
      var f = $rootScope.reses[0];
      $scope.stars = f
      console.log(($rootScope.reses[0])[0])
      var url = "http://swapi.co/api/people/"+($rootScope.reses[0])[0]+"/?format=json"
      $http.get(url).success(function(resp){
        $scope.resman = resp
      })
    }
  }
})

app.directive('swampiPlanet', function() {
  return {
    templateUrl: function(elem, attr) {
      return "chosen.html"
    },
    transclude: true,
  }
})

app.directive('swampiPlanetsSelector', function(){
  return {
    template: function(){
      return "<ul><li ng-repeat='names in planets track by $index' ng-hide='names.residents.length < q'> <a ng-click='click($index)' ng-model='turtles'>  {{names.name}} </a></li></ul>"
    },
  }
})

// app.directive('minResidents', function(x){
//   $scope.min = x;
// });



