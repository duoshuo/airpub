;(function(angular) {
  angular
    .module('airpub', [
      'ui.bootstrap',
      'ui.router',
      'duoshuo',
      'upyun'
    ]).config([
      '$stateProvider','$urlRouterProvider','$locationProvider', 
      initAirpub
    ]);

  function initAirpub($stateProvider, $urlRouterProvider, $locationProvider) {
    // theme configs
    var theme = airpubConfigs.theme || 'chill';
    var themePath = (airpubConfigs.themePath || 'bower_components') + '/' + theme;
    // init router objects
    var routers = defineRoutes(['archive', 'single', 'admin', '404', 'layout']);
    // routes configs
    $urlRouterProvider.otherwise("/404");
    // signup routes uri
    $stateProvider
      .state('layout',        routerMaker('', routers.layout))
      .state('layout.home',   routerMaker('/', routers.layout)) // alias router for layout
      .state('layout.pager',  routerMaker('/page/:page', routers.archive))
      .state('layout.single', routerMaker('/article/:uri', routers.single))
      .state('layout.create', routerMaker('/create', routers.admin, appendTitleToRouter('新建文章')))
      .state('layout.update', routerMaker('/article/:uri/update', routers.admin, appendTitleToRouter('更新文章')))
      .state('layout.404',    routerMaker('/404', routers['404']));
    
    // hashtag config
    $locationProvider
      .hashPrefix(airpubConfigs.hashPrefix || '!');

    // html5 mode should also be supported by server side, check this out: 
    // http://stackoverflow.com/questions/18452832/angular-route-with-html5mode-giving-not-found-page-after-reload
    if (airpubConfigs.html5Mode)
      $locationProvider.html5Mode(true);

    function defineRoutes(routes) {
      var routers = {};
      angular.forEach(routes, function(route) {
        routers[route] = {};
        routers[route].templateUrl = themePath + '/' + route + '.html';
        if (route !== '404')
          routers[route].controller = route;
        // define the LAYOUT router
        if (route === 'layout') {
          // define default sub-views of layout
          routers[route].views = {
            'layout': routers.layout,
            '@layout': routers.archive,
            '@layout.home': routers.archive
          }
        }
      });
      return routers;
    }

    function routerMaker(url, router, data) {
      var obj = angular.copy(router);
      obj.url = url;
      if (data && typeof(data) === 'object') 
        obj = angular.extend(obj, data);
      return obj;
    }

    function appendTitleToRouter(title) {
      return {
        data: {
          title: title
        }
      }
    }
  }
})(window.angular);
