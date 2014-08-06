// pageer ctrler
airpub.controller('pager', function($scope) {
  $scope.totalItems = 64;
  $scope.currentPage = 1;
  $scope.setPage = function(pageNo) {
    $scope.currentPage = pageNo;
  };
  
  $scope.maxSize = 10;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
});