;(function(angular, debug) {
  'use strict';
  
  angular
    .module('airpub')
    .controller('archive', [
      '$scope', 
      '$state', 
      'duoshuo', 
      '$rootScope', 
      archiveCtrler
    ]);

  function archiveCtrler($scope, $state, duoshuo, $rootScope) {
    $scope.itemsPerPage = 10;
    $scope.currentPage = parseNumber($state.params.page) || 1;

    // Update document title
    $rootScope.$emit('updateMeta', $scope.configs.name);

    // Read articles from cache
    if ($scope.articles && $scope.articles.length > 0) 
      return;

    // TODO: remove this ugly hack
    if ($state.params.page) {
      var lock = true;
      var currentPage = $scope.currentPage;
    }

    // Read data from fresh  
    fetchFreshArticles();

    // When page changed, go => /#/page/currentPage
    // Why the fucking event was trigged twice and return `1` the second time ?!
    $scope.pageChanged = pageChanged;

    function fetchFreshArticles() {
      var query = {};
      query.page = $scope.currentPage;
      query.limit = $scope.itemsPerPage;
      query.with_content = 1;

      // Open a request
      duoshuo.get('threads/list', query, onSuccess, onError);

      function onSuccess(err, result, res) {
        if ($state.params.page)
          lock = false;
        if (err)
          return $scope.addAlert('获取信息失败，请重试', 'danger');
        if (result.length === 0)
          return $state.go('layout.404');

        // Exporse locals to templates
        $scope.articles = result || [];
        $scope.totalItems = res.cursor.total;

        if ($state.params.page) 
          $scope.currentPage = currentPage;

        return;
      }

      function onError(err) {
        return $state.go('layout.404');
      }
    }

    function pageChanged() {
      if (lock) 
        return;

      $state.go('layout.pager', {
        page: $scope.currentPage
      });
    }

    function parseNumber(str) {
      if (str && !isNaN(parseInt(str)))
        return parseInt(str);

      return false;
    }
  }
})(window.angular, window.debug);
