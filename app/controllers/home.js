angular.module('MyApp')
  .controller('HomeCtrl', function(Trees, $scope, $auth) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.trees = Trees.all();
  });
