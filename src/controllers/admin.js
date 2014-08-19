;(function() {
  'use strict';
  
  angular
    .module('airpub')
    .controller('admin', adminCtrler);

  function adminCtrler($scope, $state, $upyun, $duoshuo, $location) {
    $scope.isAdmin = false;
    console.log($location.search());
    var baseUri = $scope.configs.url || $location.host();
    var fromUri = $location.search().from;

    initAdmin();
    $scope.createArticle = createArticle;
    $scope.updateArticle = updateArticle;
    $scope.removeArticle = removeArticle;

    // init admin page
    function initAdmin() {
      // check current user if `admin`
      $duoshuo.get('sites/membership', {}, function(err, result) {
        if (err || result.role !== 'administrator')
          if (fromUri)
            return $location.path(fromUri);
          return $state.go('index');
        var isUpdatePage = $state.current.name === 'update' && $state.params.uri;
        if (!isUpdatePage) {
          $scope.isAdmin = true;
          return;
        }
        // if status is `update`, fetch data
        $duoshuo.get('threads/details', {
          thread_id: $state.params.uri
        }, function(err, result) {
          // showing the page
          $scope.isAdmin = true;
          if (err)
            return $scope.addAlert('文章内容获取失败，请稍后再试...', 'danger');
          $scope.article = result;
        }, function(err) {
          return $scope.addAlert('文章内容获取失败，请稍后再试...', 'danger');
        });
      }, function(err) {
        // error callback
        $scope.addAlert(err.errorMessage, 'danger');
        if (fromUri)
          return $location.path(fromUri);
        $state.go('index');
      });
    }

    // create new article
    function createArticle() {
      if (!$scope.isAdmin) 
        return false;
      if (!$scope.article.title) 
        return $scope.addAlert('至少写个标题咯...', 'danger');
      if (!$scope.article.content) 
        return $scope.addAlert('至少写点内容咯...', 'danger');

      var baby = {};
      baby.format = 'markdown';
      baby.title = $scope.article.title;
      baby.content = $scope.article.content;
      baby.thread_key = uuid.v1();
      if ($scope.article.meta) {
        angular.forEach($scope.article.meta, function(v, k) {
          baby['meta[' + k + ']'] = v;
        });
      }
      $duoshuo.post('threads/create', baby, function(err, result) {
        if (err) 
          return $scope.addAlert('发布失败...', 'danger');
        $scope.addAlert('发布成功');
        // update uri 
        $duoshuo.post('threads/update', {
          thread_id: result.thread_id,
          url: baseUri + '/#!/article/' + result.thread_id
        }, function(err, res) {
          if (err) console.log(err);
          $state.go('single', {
            uri: result.thread_id
          });
        });
      }, function(err) {
        return $scope.addAlert('发布失败...', 'danger');
      });
    };

    // update exist article
    function updateArticle(id) {
      if (!id) 
        return $scope.createArticle();
      if (!$scope.isAdmin) 
        return false;

      var baby = {};
      baby.thread_id = id;
      baby.title = $scope.article.title;
      baby.content = $scope.article.content;
      baby.url = baseUri + '/#!/article/' + id;
      if ($scope.article.meta) {
        angular.forEach($scope.article.meta, function(v, k) {
          baby['meta[' + k + ']'] = v;
        });
      }
      $duoshuo.post('threads/update', baby, function(err, result) {
        if (err)
          return $scope.addAlert('更新失败，请稍后再试...', 'danger');
        $scope.addAlert('更新成功!');
        $state.go('single', {
          uri: id
        });
      }, function(err) {
        return $scope.addAlert('更新失败，请稍后再试...', 'danger');
      });
    };

    // remove article
    function removeArticle(id) {
      if (!id) 
        return false;
      if (!$scope.isAdmin) 
        return false;
      // todo: confirm delete action
      $duoshuo.post('threads/remove', {
        thread_id: id
      }, function(err, result) {
        if (err)
          return $scope.addAlert('删除失败，请稍后再试...', 'danger');
        $scope.addAlert('删除成功!');
        $state.go('index');
      }, function(err) {
        return $scope.addAlert('删除失败，请稍后再试...', 'danger');
      });
    };
  }
})();
