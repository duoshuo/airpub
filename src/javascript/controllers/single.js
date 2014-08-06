// single article ctrler
airpub.controller('single', function($scope, $state, $duoshuo) {
  var uri = $state.params.uri;
  if (!uri) return $state.go('404');
  if ($scope.article) return;
  $duoshuo.get('threads/details', {
    thread_id: uri
  }, function(err, result) {
    if (err) 
      return $scope.addAlert('文章内容获取失败，请稍后再试...','danger');
    $scope.article = result;
  });
});
