// archive ctrler
airpub.controller('archive', function($scope, $state, $duoshuo) {
  // read from cache
  if ($scope.articles && $scope.articles.length > 0) return;
  // read from fresh
  fetchThreads({
    page: 1
  });

  $scope.pageChanged = function() {
    console.log($scope.currentPage);
    fetchThreads({
      page: $scope.currentPage
    });
  };

  function fetchThreads(options) {
    options.limit = 10;
    $duoshuo.get('threads/list', options, function(err, result, res) {
      if (err) 
        return $scope.addAlert('获取信息失败，请重试', 'danger');
      if (result.length === 0) 
        return $state.go('404');
      $scope.articles = result || [];
      if (!$scope.totalItems) 
        $scope.totalItems = res.cursor.total;
      return;
    });
  }

});