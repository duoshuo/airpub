// admin ctrler
airpub.controller('admin', function($scope, $state, $upyun, $duoshuo, $location) {
  $scope.isAdmin = false;
  var baseUri = $scope.configs.url || $location.host();

  // check current user if `admin`
  $duoshuo.get('sites/membership', {}, function(err, result){
    if (err || result.role !== 'administrator')
      return $state.go('index');
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
      }, function(err){
        return $scope.addAlert('文章内容获取失败，请稍后再试...','danger');
      });
      return;
    }
    // showing the page
    $scope.isAdmin = true;
  }, function(err){
    // error callback
    $scope.addAlert(err.errorMessage, 'danger');
    $state.go('index');
  });

  // create new article
  $scope.createArticle = function() {
    if (!$scope.isAdmin) return false;
    if (!$scope.article.title) return $scope.addAlert('至少写个标题咯...','danger');
    if (!$scope.article.content) return $scope.addAlert('至少写点内容咯...', 'danger');
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
        // ignore error for temp
        if (err) console.log(err);
        $state.go('single', {
          uri: result.thread_id
        });
      });
    }, function(err){
      return $scope.addAlert('发布失败...', 'danger');
    });
  };

  // update exist article
  $scope.updateArticle = function(id) {
    if (!id) return $scope.createArticle();
    if (!$scope.isAdmin) return false;
    // todo: missing update meta infomation
    var baby = {};
    baby.thread_id = id;
    baby.title = $scope.article.title;
    baby.content = $scope.article.content;
    if ($scope.article.meta) {
      angular.forEach($scope.article.meta, function(v, k){
        baby['meta[' + k + ']'] = v;
      });
    }
    $duoshuo.post('threads/update', baby, function(err, result) {
      if (err)
        return $scope.addAlert('更新失败，请稍后再试...','danger');
      $scope.addAlert('更新成功!');
      $state.go('single', {
        uri: id
      });
    }, function(err){
      return $scope.addAlert('更新失败，请稍后再试...', 'danger');
    });
  };

  // remove article
  $scope.removeArticle = function(id) {
    if (!id) return false;
    if (!$scope.isAdmin) return false;
    // todo: confirm delete action
    $duoshuo.post('threads/remove', {
      thread_id: id
    }, function(err, result) {
      if (err)
        return $scope.addAlert('删除失败，请稍后再试...', 'danger');
      $scope.addAlert('删除成功!');
      $state.go('index');
    }, function(err){
      return $scope.addAlert('删除失败，请稍后再试...', 'danger');
    });
  };

});
