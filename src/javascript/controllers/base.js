// all basic behaviors
airpub.controller('base', function($scope, $state, $timeout, $location) {

  // inject locals to template
  $scope.location = $location;
  $scope.state = $state;

  // alerts module
  $scope.alerts = [];
  $scope.addAlert = addAlert;
  $scope.closeAlert = closeAlert;

  // signin status check
  DUOSHUO.visitor.on('reset', function() {
    var visitor = (this.data.user_id === 0);
    // redirect visitors
    if (visitor) {
      $scope.$apply();
      $state.go('home');
      return;
    }
    // fullfill user data
    $scope.user = this.data;
    $scope.$apply();
  });

  // ui utils
  function addAlert(type, msg, dismiss) {
    $scope.alerts.push({
      msg: msg,
      type: type || 'success'
    });
    var alertIndex = $scope.alerts.length - 1;
    if (!dismiss) return alertIndex;
    $timeout(function() {
      $scope.closeAlert(alertIndex);
    }, 5000);
  }

  function closeAlert(index) {
    $scope.alerts.splice(index, 1);
  }

});
