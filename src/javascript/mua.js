angular.module('mua', ['ui.bootstrap', 'ui.router', 'snap'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/404");
    $stateProvider
      .state('home', {
        url: "",
        templateUrl: "views/archive.html"
      })
      .state('single', {
        url: "/article",
        templateUrl: "views/single.html"
      })
      .state('404', {
        url: "/404",
        templateUrl: "views/404.html"
      })
  })
  .controller('articlesCtrler', function($scope) {
    $scope.articles = [{
      title: '已经有 2000 行了',
      uri: '/200x',
      content: 'django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？'
    }, {
      title: 'django',
      uri: '/django',
      content: 'django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？'
    }]
  })
  .controller('singleArticlesCtrler', function($scope) {
    $scope.article = {
      title: 'django',
      uri: '/django',
      content: 'django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？'
    }
  })