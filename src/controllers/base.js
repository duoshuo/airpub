;(function(angular, debug) {
  'use strict';
  
  angular
    .module('airpub')
    .controller('layout', ['$scope', layoutCtrler])
    .controller('base', [
      '$scope', 
      '$state', 
      '$timeout', 
      '$location', 
      'duoshuo',
      baseCtrler
    ]);
  
  function baseCtrler($scope, $state, $timeout, $location, duoshuo) {
    // Exporse locals to template
    $scope.location = $location;
    $scope.state = $state;

    // Signin section
    $scope.hiddenSigninSection = true;
    $scope.toggleSigninSection = toggleSigninSection;

    // Alerts module
    $scope.alerts = [];
    $scope.addAlert = addAlert;
    $scope.closeAlert = closeAlert;

    // Update header backgroud
    $scope.updateBackground = updateBackground;

    // Expose copyright year
    $scope.copyrightYear = (new Date()).getFullYear();

    // Init account infomation
    duoshuo.on('ready', initAccount);

    function initAccount(err, data) {
      var isVisitor = (data.user_id === 0);

      if (err || isVisitor) {
        $scope.isVisitor = true;
        return;
      }

      // Expose user data
      $scope.user = data;
    }

    function toggleSigninSection() {
      $scope.hiddenSigninSection = !$scope.hiddenSigninSection;
    }

    function addAlert(msg, type, dismiss) {
      $scope.alerts.push({
        msg: msg,
        type: type || 'success'
      });
      var alertIndex = $scope.alerts.length - 1;
      $timeout(function() {
        $scope.closeAlert(alertIndex);
      }, dismiss ? (dismiss * 1000) : 3000);
      return alertIndex;
    }

    function closeAlert(index) {
      $scope.alerts.splice(index, 1);
    }

    function updateBackground(uri, dom) {
      if (!uri) 
        return;
      if (uri.indexOf('http') !== 0 && uri.indexOf('https') !== 0) 
        return;

      var hd = dom || document.getElementsByTagName('header')[0];
      
      if (!hd) 
        return;

      angular.element(hd).css({
        'background-image': 'url(' + uri + ')'
      });
    }
  }

  function layoutCtrler() {}

})(window.angular, window.debug);
