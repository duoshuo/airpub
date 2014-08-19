;(function() {
  angular
    .module('airpub', [
      'ui.bootstrap',
      'ui.router',
      'duoshuo',
      'upyun'
    ]).config(initAirpub);

  function initAirpub($stateProvider, $urlRouterProvider, $locationProvider) {
    // theme configs
    var theme = airpubConfigs.theme || 'chill';
    var themePath = (airpubConfigs.themePath || 'bower_components/') + theme;
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
        controller: 'admin',
        data: {
          title: '新建文章'
        }
      })
      .state('update', {
        url: "/article/:uri/update",
        templateUrl: themePath + "/admin.html",
        controller: 'admin',
        data: {
          title: '更新文章'
        }
      })
      .state('404', {
        url: "/404",
        templateUrl: themePath + "/404.html"
      });
    
    // html5 mode should also be supported by server side, check this out: 
    // http://stackoverflow.com/questions/18452832/angular-route-with-html5mode-giving-not-found-page-after-reload
    if (airpubConfigs.html5Mode)
      $locationProvider.html5Mode(true);

    // hashtag config
    $locationProvider
      .hashPrefix(airpubConfigs.hashPrefix || '!');
  }
})();
