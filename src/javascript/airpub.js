(function(duoshuo) {
  var app = angular.module('airpub', ['ui.bootstrap', 'ui.router', 'snap']);
  if (!duoshuo) return;
  if (!duoshuo.API) return;
  var database = duoshuo.API;
  // angular plugins configs
  app.config(function(
    $stateProvider,
    $urlRouterProvider,
    snapRemoteProvider) {
    // ui configs
    snapRemoteProvider.globalOptions.disable = 'right';
    // routes configs
    $urlRouterProvider.otherwise("/404");
    $stateProvider
      .state('home', {
        url: "",
        templateUrl: "views/archive.html",
        controller: 'articles'
      })
      .state('index', {
        url: "/",
        templateUrl: "views/archive.html",
        controller: 'articles'
      })
      .state('article', {
        url: "/article/:uri",
        templateUrl: "views/single.html",
        controller: 'article'
      })
      .state('404', {
        url: "/404",
        templateUrl: "views/404.html"
      })
      .state('admin', {
        url: "/admin",
        templateUrl: "views/admin.html",
        controller: 'admin'
      })
  });
  // archive ctrler
  app.controller('articles', function($scope, $state) {
    if ($scope.articles && $scope.articles.length > 0) return;
    NProgress.start();
    database.get('threads/list', {
      limit: 30,
      page: 1
    }, function(data) {
      NProgress.done();
      $scope.$parent.ready = true;
      if (data.code !== 0) $scope.addAlert('danger', '获取信息失败，请重试');
      $scope.articles = data.response || [];
      $scope.$apply();
      return;
    });
  });
  // article ctrler
  app.controller('article', function($scope, $state) {
    var uri = $state.params.uri;
    if (!uri) return; // TODO: go 404
    return;
  });
  // pageer ctrler
  app.controller('pager', function($scope) {
    $scope.totalItems = 64;
    $scope.currentPage = 1;
    $scope.setPage = function(pageNo) {
      $scope.currentPage = pageNo;
    };
    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };
    $scope.maxSize = 10;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
  });
  // all ui behaviors
  app.controller('ui', function($scope) {
    $scope.alerts = [];
    $scope.addAlert = function(type, msg) {
      $scope.alerts.push({
        msg: msg,
        type: type || 'success'
      });
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });
  // admin ctrler
  app.controller('admin', function($scope, $state) {

  });
})(window.DUOSHUO);
