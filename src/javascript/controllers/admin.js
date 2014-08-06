// admin ctrler
airpub.controller('admin', function($scope, $state, $upyun, $duoshuo, $location) {
  $scope.isAdmin = false;
  console.log($location);
  var baseUri = $scope.configs.url || $location.host();
  // todo: error handler
  $duoshuo.get('sites/membership', {}, function(err, result){
    if (err || result.role !== 'administrator')
      return $state.go('404');
    $scope.isAdmin = true;
  }, function(err){
    // error callback
    console.log(err);
    $scope.addAlert(err.errorMessage, 'danger');
  });
  $scope.createArticle = function() {
    if (!$scope.isAdmin) return false;
    var thread_key = uuid.v1();
    $duoshuo.post('threads/create',{
      format: 'markdown',
      title: $scope.article.title,
      content: $scope.article.content,
      thread_key: thread_key,
      url: baseUri + '/#/article/' + thread_key,
    }, function(err, result) {
      if (err) return $scope.addAlert('发布失败...', 'danger');
      $scope.addAlert('发布成功');
      $location.path('/#/');
      console.log(result);
    });
  };
});
