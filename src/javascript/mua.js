angular.module('mua', ['ui.bootstrap', 'ui.router'])
  config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/404");
    $stateProvider
      .state('home', {
        url: "",
        templateUrl: "views/archive.html"
      })
      .state('archive', {
        url: "/archive",
        templateUrl: "views/archive.html"
      })
      .state('single', {
        url: "/article",
        templateUrl: "views/article.html"
      })
  })
  .controller('alertCtrler', function($scope) {
    $scope.alerts = [{
      type: 'danger',
      msg: 'Oh snap! Change a few things up and try submitting again.'
    }];
    $scope.addAlert = function() {
      $scope.alerts.push({
        msg: 'Another alert!'
      });
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  })