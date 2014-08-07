// admin ctrler
airpub.controller('admin', function($scope, $state, $upyun, $duoshuo, $location) {
  $scope.isAdmin = false;
  var baseUri = $scope.configs.url || $location.host();

  // check current user if `admin`
  $duoshuo.get('sites/membership', {}, function(err, result){
    if (err || result.role !== 'administrator')
      return $state.go('404');
    // if status is `update`, fetch data
    if ($state.current.name === 'update' && $state.params.uri) {
      // fetch article details
      $duoshuo.get('threads/details', {
        thread_id: $state.params.uri
      }, function(err, result) {
        // showing the page
        $scope.isAdmin = true;
        if (err) 
          return $scope.addAlert('文章内容获取失败，请稍后再试...','danger');
        $scope.article = result;
      });
      return;
    }
    // showing the page
    $scope.isAdmin = true;
  }, function(err){
    // error callback
    $scope.addAlert(err.errorMessage, 'danger');
  });

  // create article handler
  $scope.createArticle = function() {
    if (!$scope.isAdmin) return false;
    $duoshuo.post('threads/create',{
      format: 'markdown',
      title: $scope.article.title,
      content: $scope.article.content,
      // url: baseUri + '/#/article/' + thread_key,
      // 'meta[cover]': 'http://metaCoverUri.jpg'
    }, function(err, result) {
      if (err) return $scope.addAlert('发布失败...', 'danger');
      $scope.addAlert('发布成功');
      $location.path('/');
    });
  };

  // update article handler
  $scope.updateArticle = function(id) {
    if (!id) return $scope.createArticle();
    $duoshuo.post('threads/update', {
      thread_id: id,
      title: $scope.article.title,
      content: $scope.article.content,
    }, function(err, result) {
      if (err)
        return $scope.addAlert('更新失败，请稍后再试...','danger');
      $scope.addAlert('更新成功!');
      console.log(result);
    });
  };

});
