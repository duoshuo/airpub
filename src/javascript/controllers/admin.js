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

  // create new article
  $scope.createArticle = function() {
    if (!$scope.isAdmin) return false;
    var baby = {};
    baby.format = 'markdown';
    baby.title = $scope.article.title;
    baby.content = $scope.article.content;
    baby.thread_key = uuid.v1();
    if ($scope.article.meta) {
      angular.forEach($scope.article.meta, function(v, k){
        baby['meta[' + k + ']'] = v;
      });
    }
    $duoshuo.post('threads/create', baby, function(err, result) {
      if (err) return $scope.addAlert('发布失败...', 'danger');
      $scope.addAlert('发布成功');
      // update uri 
      // todo: merge this function to `updateArticle`
      $duoshuo.post('threads/update', {
        thread_id: result.thread_id,
        url: baseUri + '/#/article/' + result.thread_id
      }, function(err, result) {
        if (err) console.log(err); // ignore error for temp
        $location.path('/');
      });
    });
  };

  // update exist article
  $scope.updateArticle = function(id) {
    if (!id) return $scope.createArticle();
    // todo: missing update meta infomation
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
