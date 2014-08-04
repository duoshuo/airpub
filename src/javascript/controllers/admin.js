// admin ctrler
airpub.controller('admin', function($scope, $state, $upyun, $duoshuo) {
  // todo: error handler
  $duoshuo.get('sites/membership', {}, function(data){
    var isOk = data.code === 0;
    if (!isOk || data.response.role !== 'administrator')
      return $state.go('404');
    $scope.isAdmin = true;
  });
  $scope.createArticle = function() {
    console.log($scope.article);
  };
});
