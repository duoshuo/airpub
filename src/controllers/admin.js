;(function(angular) {
  'use strict';
  
  angular
    .module('airpub')
    .controller('admin', [
      '$scope','$state', '$upyun', '$duoshuo', '$location', '$rootScope', 
      adminCtrler
    ]);

  function adminCtrler($scope, $state, $upyun, $duoshuo, $location, $rootScope) {
    $scope.isAdmin = false;
    var baseUri = $scope.configs.url || $location.host();
    var hashPrefix = $scope.configs.hashPrefix || '!';
    var hashTag = '/#' + hashPrefix;

    initAdmin();
    $scope.createArticle = createArticle;
    $scope.updateArticle = updateArticle;
    $scope.removeArticle = removeArticle;
    $scope.on = eventBinder;

    // init admin page
    function initAdmin() {
      $rootScope.$emit('updateMeta', $state.current.data.title);
      // check current user if `admin`
      $duoshuo.get('sites/membership', {}, function(err, result) {
        if (err || result.role !== 'administrator') 
          return $state.go('layout.home');
        var isUpdatePage = $state.current.name === 'layout.update' && $state.params.uri;
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
        $state.go('layout.home');
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
      baby = insertMeta(baby);
      // events bind
      eventTrigger('beforeCreate', baby);

      $duoshuo.post('threads/create', baby, function(err, result) {
        if (err) 
          return $scope.addAlert('发布失败...', 'danger');
        $scope.addAlert('发布成功');
        // update uri 
        $duoshuo.post('threads/update', {
          thread_id: result.thread_id,
          url: baseUri + hashTag + '/article/' + result.thread_id
        }, function(err, res) {
          if (err) console.log(err);
          $state.go('layout.single', {
            uri: result.thread_id
          });
        });
        // events bind
        eventTrigger('afterCreate', result);
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
      baby.url = baseUri + hashTag + '/article/' + id;
      baby = insertMeta(baby);
      eventTrigger('beforeUpdate', baby);

      $duoshuo.post('threads/update', baby, function(err, result) {
        if (err)
          return $scope.addAlert('更新失败，请稍后再试...', 'danger');
        $scope.addAlert('更新成功!');
        // events bind
        eventTrigger('afterUpdate', result);
        // goto article details
        $state.go('layout.single', {
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
      // events bind
      eventTrigger('beforeRemove', id);
      // TODO: confirm delete action
      $duoshuo.post('threads/remove', {
        thread_id: id
      }, function(err, result) {
        if (err)
          return $scope.addAlert('删除失败，请稍后再试...', 'danger');
        // events bind
        eventTrigger('afterRemove', id);
        $scope.addAlert('删除成功!');
        $state.go('layout.home');
      }, function(err) {
        return $scope.addAlert('删除失败，请稍后再试...', 'danger');
      });
    };

    // insert meta to plain text query string.
    function insertMeta(qs) {
      if (!$scope.article.meta) return qs;
      angular.forEach($scope.article.meta, function(v, k) {
        qs['meta[' + k + ']'] = v;
      });
      return qs;
    }

    // bind events
    function eventBinder(eventName, func) {
      if (!eventName || !func || typeof(func) !== 'function')
        return false;
      if (!$scope.bindedEvents) $scope.bindedEvents = {};
      $scope.bindedEvents[eventName] = func;
      return $scope.bindedEvents;
    }

    // event trigger
    function eventTrigger(eventName, data) {
      if (!$scope.bindedEvents || !$scope.bindedEvents[eventName]) 
        return;
      return $scope.bindedEvents[eventName](data || $scope.article, eventName);
    }
  }
})(window.angular);
