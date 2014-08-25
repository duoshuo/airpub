;(function(angular) {
  'use strict';
  
  angular
    .module('airpub')
    .controller('meta', ['$scope', '$rootScope', metaCtrler]);

  function metaCtrler($scope, $rootScope) {
    $scope.title = $scope.configs.name || 'Airpub';
    $scope.description = $scope.configs.description || 'just another Airpub blog';

    $rootScope.$on('updateMeta', function(eve, data){
      if (typeof(data) === 'string')
        return $scope.title = data;
      angular.forEach(data, function(v, k){
        $scope[k] = v;
      });
    });
  }
})(window.angular);
