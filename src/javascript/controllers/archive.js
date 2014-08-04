// archive ctrler
airpub.controller('archive', function($scope, $state, $duoshuo) {
  // read from cache
  if ($scope.articles && $scope.articles.length > 0) return;
  // read from fresh
  $duoshuo.get('threads/list', {
    page: 1,
    limit: 30,
    with_content: 1
  }, function(data) {
    // console.log(data);
    // if error
    if (data.code !== 0) 
      $scope.addAlert('danger', '获取信息失败，请重试');
    // if no articles
    if (data.response.length === 0) 
      return $state.go('404');
    $scope.articles = data.response || [];
    return;
  });
});