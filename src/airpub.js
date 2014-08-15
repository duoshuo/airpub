// signup app
var airpub = angular.module('airpub', [
  'ui.bootstrap',
  'ui.router',
  'duoshuo',
  'upyun'
]);

// angular plugins configs
airpub.config(function($stateProvider, $urlRouterProvider) {
  // theme configs
  var theme = airpubConfigs.theme || 'chill';
  var themePath = 'bower_components/' + theme;
  // routes configs
  $urlRouterProvider.otherwise("/404");
  $stateProvider
    .state('home', {
      url: "",
      templateUrl: themePath + "/archive.html",
      controller: 'archive'
    })
    .state('index', {
      url: "/",
      templateUrl: themePath + "/archive.html",
      controller: 'archive'
    })
    .state('pager', {
      url: "/page/:page",
      templateUrl: themePath + "/archive.html",
      controller: 'archive'
    })
    .state('single', {
      url: "/article/:uri",
      templateUrl: themePath + "/single.html",
      controller: 'single'
    })
    .state('create', {
      url: "/create",
      templateUrl: themePath + "/admin.html",
      controller: 'admin'
    })
    .state('update', {
      url: "/article/:uri/update",
      templateUrl: themePath + "/admin.html",
      controller: 'admin'
    })
    .state('404', {
      url: "/404",
      templateUrl: themePath + "/404.html"
    })
});
