// single article ctrler
airpub.controller('single', function($scope, $state, $duoshuo) {
  var uri = $state.params.uri;
  if (!uri) return $state.go('404');
  $duoshuo.get('threads/details', {
    thread_id: uri
  }, function(data){
    var isOk = data.code === 0;
    if (!isOk) console.log('信息获取失败'); // todo, change to ui alert.
    $scope.article = data.response;
  });
});
