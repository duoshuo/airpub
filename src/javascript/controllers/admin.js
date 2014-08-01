// admin ctrler
airpub.controller('admin', function($scope, $state, $upyun, $duoshuo) {
  var editor = new Editor();
  editor.render();
  $scope.createArticle = function() {
    console.log($scope.article);
    return;
  }
});
