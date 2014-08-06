// single article ctrler
airpub.controller('single', function($scope, $state, $duoshuo) {
  var uri = $state.params.uri;
  if (!uri) return $state.go('404');
  // read from cache
  if ($scope.article) return;

  // fetch article details
  $duoshuo.get('threads/details', {
    thread_id: uri
  }, function(err, result) {
    if (err) 
      return $scope.addAlert('文章内容获取失败，请稍后再试...','danger');
    $scope.article = result;
    // fetch authors' profile
    $duoshuo.get('users/profile', {
      user_id: result.author_id
    }, function(err, result){
      if (err) return; // ignore null profile
      $scope.author = result;
    })
  });

  // remove article
  $scope.removeArticle = function(id) {
    $duoshuo.post({
      thread_id: id
    }, function(err, result) {
      if (err)
        return $scope.addAlert('删除失败，请稍后再试...', 'danger');
      $scope.addAlert('删除成功!');
      console.log(result);
    });
  }
});
