// admin ctrler
airpub.controller('admin', function($scope, $state, $upyun, $duoshuo) {
  $duoshuo.get('sites/membership', {}, function(){
    
  });
  $scope.createArticle = function() {
    console.log($scope.article);
  };
});
