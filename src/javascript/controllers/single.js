// single article ctrler
airpub.controller('single', function($scope, $state) {
  var uri = $state.params.uri;
  if (!uri) return $state.go('404');
  // todo: fetch single article via thread_id
  return;
});