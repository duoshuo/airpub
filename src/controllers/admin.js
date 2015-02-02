;(function(angular, debug) {
  'use strict';
  
  angular
    .module('airpub')
    .controller('admin', [
      '$scope', 
      '$state', 
      'duoshuo', 
      '$location', 
      '$rootScope', 
      adminCtrler
    ]);

  function adminCtrler($scope, $state, duoshuo, $location, $rootScope) {
    // Reset isAdmin status
    $scope.isAdmin = false;

    var baseUri = $scope.configs.url || $location.host();
    var hashPrefix = $scope.configs.hashPrefix || '!';
    var hashTag = '/#' + hashPrefix;

    initAdmin();

    // Expose functions to templates
    $scope.createArticle = createArticle;
    $scope.updateArticle = updateArticle;
    $scope.removeArticle = removeArticle;
    $scope.on = eventBinder;

    // Init admin page
    function initAdmin() {
      $rootScope.$emit('updateMeta', $state.current.data.title);

      // Open a request
      duoshuo.get('sites/membership', {}, onSuccess, onError);

      function onSuccess(err, result) {
        if (err || result.role !== 'administrator') 
          return $state.go('layout.home');

        var isUpdatePage = $state.current.name === 'layout.update' && $state.params.uri;

        // If status is `update`, fetch data
        if (!isUpdatePage) {
          $scope.isAdmin = true;
          return;
        }

        var query = {};
        query.thread_id = $state.params.uri;

        // Fetch article details in edit mode.
        duoshuo.get('threads/details', query, response, fail);

        function response(err, result) {
          // Now show the page
          $scope.isAdmin = true;

          if (err)
            return fail(err);

          // Expose article locals to template
          $scope.article = result;
        }

        function fail(err) {
          return $scope.addAlert('文章内容获取失败，请稍后再试...', 'danger');
        }
      }

      // Error callback
      function onError(err) {
        $scope.addAlert(err.errorMessage, 'danger');
        $state.go('layout.home');
      }
    }

    // Create a new article
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

      // Trigger events
      eventTrigger('beforeCreate', baby);

      // Open a request
      duoshuo.post('threads/create', baby, onSuccess, onError);

      function onSuccess(err, result) {
        if (err) 
          return $scope.addAlert('发布失败...', 'danger');

        $scope.addAlert('发布成功');

        // Update article URI 
        // TODO: Merge this two request in one.
        var query = {};
        query.thread_id = result.thread_id;
        query.url = baseUri + hashTag + '/article/' + result.thread_id;

        // Open a request
        duoshuo.post('threads/update', query, response);

        // Trigger events
        eventTrigger('afterCreate', result);

        function response(err, res) {
          if (err) 
            console.log(err);

          $state.go('layout.single', {
            uri: result.thread_id
          });
        }
      }

      function onError(err) {
        return $scope.addAlert('发布失败...', 'danger');
      }
    };

    // Update a exist article
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

      // Trigger events
      eventTrigger('beforeUpdate', baby);

      // Open a request
      duoshuo.post('threads/update', baby, onSuccess, onError);

      function onSuccess(err, result) {
        if (err)
          return $scope.addAlert('更新失败，请稍后再试...', 'danger');

        $scope.addAlert('更新成功!');

        // Trigger events
        eventTrigger('afterUpdate', result);

        // Goto article details page
        $state.go('layout.single', {
          uri: id
        });
      }

      function onError(err) {
        return $scope.addAlert('更新失败，请稍后再试...', 'danger');
      }
    };

    // Remove a exist article
    function removeArticle(id) {
      if (!id) 
        return false;
      if (!$scope.isAdmin) 
        return false;

      // Trigger events
      eventTrigger('beforeRemove', id);

      // TODO: Confirm delete action
      var query = {};
      query.thread_id = id;

      // Open a request
      duoshuo.post('threads/remove', query, onSuccess, onError);

      function onSuccess(err, result) {
        if (err)
          return $scope.addAlert('删除失败，请稍后再试...', 'danger');

        // Trigger events
        eventTrigger('afterRemove', id);

        $scope.addAlert('删除成功!');
        $state.go('layout.home');
      }

      function onError(err) {
        return $scope.addAlert('删除失败，请稍后再试...', 'danger');
      }
    };

    // Insert meta to plain text query string.
    function insertMeta(qs) {
      if (!$scope.article.meta) 
        return qs;

      angular.forEach($scope.article.meta, function(v, k) {
        qs['meta[' + k + ']'] = v;
      });

      return qs;
    }

    // Bind events
    function eventBinder(eventName, func) {
      if (!eventName || !func || typeof(func) !== 'function')
        return false;

      if (!$scope.bindedEvents) 
        $scope.bindedEvents = {};

      $scope.bindedEvents[eventName] = func;

      return $scope.bindedEvents;
    }

    // Events trigger
    function eventTrigger(eventName, data) {
      if (!$scope.bindedEvents || !$scope.bindedEvents[eventName]) 
        return;
      return $scope.bindedEvents[eventName](data || $scope.article, eventName);
    }
  }
})(window.angular, window.debug);
