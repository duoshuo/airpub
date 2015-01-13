;(function(angular, debug) {
  'use strict';
  
  angular
    .module('airpub')
    .controller('meta', [
      '$scope', 
      '$rootScope',
      'share',
      metaCtrler
    ]);

  function metaCtrler($scope, $rootScope, share) {
    $scope.title = $scope.configs.name || 'Airpub';
    $scope.description = $scope.configs.description || 'just another Airpub blog';

    // Init service share
    share.wechat({
      title: $scope.configs.name,
      link: $scope.configs.url,
      desc: $scope.configs.description
    });

    $rootScope.$on('updateMeta', function(eve, data){
      if (typeof(data) === 'string')
        return $scope.title = data;
      angular.forEach(data, function(v, k){
        $scope[k] = v;
      });
    });
  }
})(window.angular, window.debug);
