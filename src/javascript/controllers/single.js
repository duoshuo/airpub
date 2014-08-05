// single article ctrler
airpub.controller('single', function($scope, $state, $duoshuo) {
  var uri = $state.params.uri;
  if (!uri) return $state.go('404');
  $duoshuo.get('threads/details', {
    thread_id: uri
  }, function(err, result) {
    if (err) return $scope.addAlert('信息获取失败','danger');
    $scope.article = result;
  });
});
