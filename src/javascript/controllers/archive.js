// archive ctrler
airpub.controller('archive', function($scope, $state, $duoshuo) {
  // read from cache
  if ($scope.articles && $scope.articles.length > 0) return;
  // read from fresh
  NProgress.start();
  $duoshuo.get('threads/list', {
    page: 1,
    limit: 30
  }, function(data) {
    NProgress.done();
    if (data.code !== 0) $scope.addAlert('danger', '获取信息失败，请重试');
    $scope.articles = data.response || [];
    $scope.$apply();
    if ($scope.articles.length === 0) return $state.go('404');
    return;
  });
});