window.maker = angular.module('maker', ['store']);

// global ctrlers
maker.ctrlers = {
    news: function($scope, Store) {
        $scope.submit = function() {
            Store.news.save({
                news: $scope.news
            }, function(result) {
                if (result.stat == 'ok') {
                    window.location.href = '/news/' + result.news._id;
                } else {
                    $scope.msg = result.msg;
                }
            });
        }
        $scope.vote = function(id) {
            Store.news.vote({
                id: id,
                vote: true
            }, function(result){
                console.log(result);
            });
        }
    },
    sign: function($scope, Store) {
        $scope.signin = function() {
            $scope.stat = 'disabled';
            Store.signin.save($scope.user, function(result) {
                if (result.stat == 'ok') {
                    window.location.href = '/';
                } else {
                    $scope.msg = result.msg;
                    $scope.stat = 'enable';
                }
            })
        }
        $scope.signup = function() {
            $scope.stat = 'disabled';
            Store.signup.save({
                user: $scope.user
            }, function(result) {
                $scope.msg = result.msg;
                $scope.stat = 'enable';
            })
        }
        $scope.checkPassword = function() {
            $scope.signForm.passwordConfirm.$error.dontMatch = $scope.user.password !== $scope.user.passwordConfirm;
        };
    }
};