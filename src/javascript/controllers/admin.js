// admin ctrler
airpub.controller('admin', function($scope, $state, $upyun, $duoshuo) {
  // clear progress
  NProgress.done();
  $scope.createArticle = function() {
    console.log($scope.article);
    return;
  }
});
