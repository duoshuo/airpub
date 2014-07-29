// archive ctrler
airpub.controller('archive', function($scope, $state) {
  // read from cache
  if ($scope.articles && $scope.articles.length > 0) return;
  // check duoshuo instance
  if (!duoshuo) return;
  // read from fresh
  NProgress.start();
  database.get('threads/list', {
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