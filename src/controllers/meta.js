;(function(angular) {
  'use strict';
  
  angular
    .module('airpub')
    .controller('meta', ['$scope', '$rootScope', metaCtrler]);

  function metaCtrler($scope, $rootScope) {
    $scope.title = $scope.configs.name || 'Airpub';
    $scope.description = $scope.configs.description || 'just another Airpub blog';
    initWeixinShare($scope.configs);

    $rootScope.$on('updateMeta', function(eve, data){
      if (typeof(data) === 'string')
        return $scope.title = data;
      angular.forEach(data, function(v, k){
        $scope[k] = v;
      });
    });
  }

  function initWeixinShare(metaData) {
    if (!window.wechat)
      return;

    var wechat = window.wechat;
    var data = {};

    if (metaData.url) data.link = metaData.url
    if (metaData.name) data.title = metaData.name;
    if (metaData.description) data.desc = metaData.description;

    wechat('friend', data);
    wechat('timeline', data);
    wechat('weibo', data);
  }
})(window.angular);
