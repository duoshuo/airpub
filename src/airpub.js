;(function(angular, debug) {
  'use strict';

  angular
    .module('airpub', [
      'upyun',
      'duoshuo',
      'ui.router',
      'ui.bootstrap',
      'oc.lazyLoad',
      'ngSanitize'
    ]).config([
      '$stateProvider',
      '$urlRouterProvider',
      '$locationProvider',
      '$ocLazyLoadProvider',
      'upyunProvider',
      initAirpub
    ]);

  function initAirpub($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider, upyunProvider) {
    // Theme configs
    var theme = airpubConfigs.theme || 'chill';
    var themePath = (airpubConfigs.themePath || 'bower_components') + '/' + theme;
    var staticPath = airpubConfigs.staticPath || '';

    // Init Router objects
    var routers = defineRoutes(['archive', 'single', 'admin', '404', 'layout']);

    // Routes configs
    $urlRouterProvider.otherwise("/404");
    // Signup routes uri
    $stateProvider
      .state('layout',        routerMaker('', routers.layout))
      .state('layout.home',   routerMaker('/', routers.layout)) // alias router for layout
      .state('layout.pager',  routerMaker('/page/:page', routers.archive))
      .state('layout.single', routerMaker('/article/:uri', routers.single))
      .state('layout.create', routerMaker('/create', routers.admin, appendTitleToRouter('写新文章')))
      .state('layout.update', routerMaker('/article/:uri/update', routers.admin, appendTitleToRouter('更新文章')))
      .state('layout.404',    routerMaker('/404', routers['404']));

    // Rredefine async loaded scripts
    $ocLazyLoadProvider.config({
      modules: [{
        name: 'EditorNinja',
        files: [
          staticPath + 'bower_components/ninja/dist/ninja.min.js', 
          staticPath + 'bower_components/ninja/dist/ninja.min.css'
        ]
      },{
        name: 'EditorNinja.upload',
        files: [
          staticPath + 'bower_components/ninja/dist/ninja.min.js'
        ]
      }]
    });
    
    // Hashtag config
    $locationProvider
      .hashPrefix(airpubConfigs.hashPrefix || '!');

    // Html5 mode should also be supported by server side, check this out: 
    // http://stackoverflow.com/questions/18452832/angular-route-with-html5mode-giving-not-found-page-after-reload
    if (airpubConfigs.html5Mode)
      $locationProvider.html5Mode(true);

    if (airpubConfigs.upyun)
      upyunProvider.config(airpubConfigs.upyun);

    initWeixinShare();

    function defineRoutes(routes) {
      var routers = {};

      angular.forEach(routes, function(route) {
        routers[route] = {};
        routers[route].templateUrl = themePath + '/' + route + '.html';
        if (route !== '404')
          routers[route].controller = route;
        // Define the LAYOUT router
        if (route === 'layout') {
          // Define default sub-views of layout
          routers[route].views = {
            'layout': routers.layout,
            '@layout': routers.archive,
            '@layout.home': routers.archive
          }
        }

        if (['admin', 'single'].indexOf(route) > -1)
          routers[route].resolve = lazyloadResources(route);
      });

      return routers;
    }

    function lazyloadResources(route) {
      var map = {
        admin: loadEditor,
        single: loadSingle
      };

      return {
        lazyload: ['$ocLazyLoad', map[route]]
      }
    }

    // Load EditorNinja async
    function loadEditor($ocLazyLoad) {
      return $ocLazyLoad.load('EditorNinja').then(function(){
        // Load ninja addons
        $ocLazyLoad.load('EditorNinja.upload');
        // Load other deps in `admin.html`
        $ocLazyLoad.load({
          files: [
            staticPath + 'bower_components/node-uuid/uuid.js'
          ]
        });
      });
    }

    function loadSingle($ocLazyLoad) {
      return $ocLazyLoad.load({
        files: [
          staticPath + 'bower_components/marked/lib/marked.js',
          staticPath + 'bower_components/highlightjs/highlight.pack.js',
        ]
      });
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

    function initWeixinShare() {
      if (!window.wechat)
        return;

      var data = {};

      if (airpubConfigs.url)
        data.link = airpubConfigs.url;
      if (airpubConfigs.description)
        data.desc = airpubConfigs.description;
      if (airpubConfigs.name)
        data.title = airpubConfigs.name;

      window.wechat('friend', data);
      window.wechat('timeline', data);
      window.wechat('weibo', data);
    }
  }
})(window.angular, window.debug);
