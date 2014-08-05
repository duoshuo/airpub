// archive ctrler
airpub.controller('archive', function($scope, $state, $duoshuo) {
  // read from cache
  if ($scope.articles && $scope.articles.length > 0) return;
  // read from fresh
  $duoshuo.get('threads/list', {
    page: 1,
    limit: 30,
    with_content: 1
  }, function(err, result) {
    if (err) 
      return $scope.addAlert('danger', '获取信息失败，请重试');
    if (result.length === 0) 
      return $state.go('404');
    $scope.articles = result || [];
    return;
  });
});