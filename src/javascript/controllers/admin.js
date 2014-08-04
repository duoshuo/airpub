// admin ctrler
airpub.controller('admin', function($scope, $state, $upyun, $duoshuo) {
  console.log($duoshuo);
  $scope.createArticle = function() {
    console.log($scope.article);
  };
});
