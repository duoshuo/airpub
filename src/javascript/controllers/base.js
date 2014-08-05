// all basic behaviors
airpub.controller('base', function($scope, $state, $timeout, $location, $duoshuo) {  
  // inject locals to template
  $scope.location = $location;
  $scope.state = $state;

  // alerts module
  $scope.alerts = [];
  $scope.addAlert = addAlert;
  $scope.closeAlert = closeAlert;

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
});
