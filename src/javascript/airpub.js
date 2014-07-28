(function(duoshuo) {
  var app = angular.module('airpub', ['ui.bootstrap', 'ui.router', 'snap']);
  if (!duoshuo) return;
  if (!duoshuo.API) return;
  var database = duoshuo.API;
  // angular plugins configs
  app.config(function($stateProvider, $urlRouterProvider, snapRemoteProvider) {
    // ui configs
    snapRemoteProvider.globalOptions.disable = 'right';
    // routes configs
    $urlRouterProvider.otherwise("/404");
    $stateProvider
      .state('home', {
        url: "",
        templateUrl: "views/archive.html",
        controller: 'archive'
      })
      .state('index', {
        url: "/",
        templateUrl: "views/archive.html",
        controller: 'archive'
      })
      .state('single', {
        url: "/article/:uri",
        templateUrl: "views/single.html",
        controller: 'single'
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
  app.controller('archive', function($scope, $state) {
    // read from cache
    if ($scope.articles && $scope.articles.length > 0) return;
    // read from fresh
    NProgress.start();
    database.get('threads/list', {
      page: 1,
      limit: 30
    }, function(data) {
      NProgress.done();
      if (data.code !== 0) $scope.addAlert('danger', '获取信息失败，请重试');
      $scope.articles = data.response || [];
      $scope.$apply();
      if ($scope.articles.length === 0) return $state.go('404');
      return;
    });
  });
  // single article ctrler
  app.controller('single', function($scope, $state) {
    var uri = $state.params.uri;
    if (!uri) return $state.go('404');
    // todo: fetch single article via thread_id
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
  // all basic behaviors
  app.controller('base', function($scope, $state, $timeout, $location) {
    $scope.location = $location;
    $scope.state = $state;

    // alerts module
    $scope.alerts = [];
    $scope.addAlert = function(type, msg, dismiss) {
      $scope.alerts.push({ msg: msg, type: type || 'success' });
      var alertIndex = $scope.alerts.length - 1;
      if (!dismiss) return alertIndex;
      $timeout(function() {
        $scope.closeAlert(alertIndex);
      }, 5000);
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    // signin status check
    duoshuo.visitor.on('reset', function(){
      var visitor = (this.data.user_id === 0);
      // redirect visitors
      if (visitor) { 
        // $scope.addAlert('danger','抱歉，你还没有登录哦', true);
        $scope.$apply();
        $state.go('home');
        return;
      }
      // fullfill user data
      $scope.user = this.data;
      $scope.$apply();
    });
  });
  // admin ctrler
  app.controller('admin', function($scope, $state) {
    NProgress.done();
    console.log($scope.location);
  });
})(window.DUOSHUO);
