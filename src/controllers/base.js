;(function() {
  'use strict';
  
  angular
    .module('airpub')
    .controller('base', baseCtrler);

  function baseCtrler($scope, $state, $timeout, $location, $duoshuo) {
    // inject locals to template
    $scope.location = $location;
    $scope.state = $state;

    // alerts module
    $scope.alerts = [];
    $scope.addAlert = addAlert;
    $scope.closeAlert = closeAlert;

    // update header backgroud
    $scope.updateBackground = updateBackground;

    // init copyright
    $scope.copyrightYear = (new Date()).getFullYear();

    // signin status check
    $duoshuo.on('ready', function(err, data) {
      var isVisitor = (data.user_id === 0);
      if (err || isVisitor) return;
      // fullfill user data
      $scope.user = data;
    });

    // ui utils
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

    function updateBackground(uri) {
      if (!uri) return;
      if (uri.indexOf('http') !== 0) return;
      var hd = document.getElementsByTagName('header')[0];
      if (!hd) return;
      angular.element(hd).css({
        'background-image': 'url(' + uri + ')'
      });
    }
  }
})();
