angular.module('mua', ['ui.bootstrap', 'ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/404");
    $stateProvider
      .state('home', {
        url: "",
        templateUrl: "views/archive.html",
        controller: 'articleCtrler'
      })
      .state('index', {
        url: "/",
        templateUrl: "views/archive.html",
        controller: 'articleCtrler'
      })
      .state('article', {
        url: "/article/:uri",
        templateUrl: "views/single.html",
        controller: 'articleCtrler'
      })
      .state('404', {
        url: "/404",
        templateUrl: "views/404.html"
      })
  })
  .controller('articleCtrler', function($scope, $state) {
    var uri = $state.params.uri;
    console.log(uri);
    if (!uri) {
      $scope.articles = [{
        title: '摩托罗拉推出贴在皮肤上的“身份证”',
        uri: 'swsws',
        content: '自从苹果在iPhone 5S中推出 TouchID 指纹解锁后，三星也很快在自家的三防旗舰机Galaxy S5中，加入配套的指纹解锁功能。在7月22日，小米推出的手环配件，也想让其成为手机解锁的辅助配件。现在，摩托罗拉也加入了此轮指纹解锁的花样之争——它借助的是一样名为“电子文身”的产品。我们先解释下摩托罗拉的“电子文身”是什么？它是一种可以被贴在人体皮肤上的超薄电路。用户通过近距离无线通讯技术（NFC），把MOTO X手机靠近贴片的位置，就能对它进行解锁。而不需要输入繁琐的PIN码或滑动解锁。在不需要的时候，贴边能随时被摘下来。据Businessinsider引述摩托罗拉人士话来说，它只有一美分硬币的大小，是一种防水的NFC贴片，在游泳和健身时都没什么问题，但有效续航时间只有5天。<br>它看上去真的很酷，光是外表就能激发不少科技圈从业者跃跃欲试的热情了。并且就像苹果的Touch ID等技术一样，给那些不耐烦输入密码的用户，一个更方便的操作体验。但问题在于，到目前为止，电子文身其实都并不那么实用：'
      }, {
        title: 'django',
        uri: 'swswswsws2212',
        content: 'django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？'
      }];
      return;
    } else {
      $scope.article = {
        title: 'django',
        uri: '/django',
        content: 'django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？django - models.py 已经有 2000 行了，有什么办法，能分割成一个 module，一个文件夹多个文件的形式呢？'
      }
    }
  })