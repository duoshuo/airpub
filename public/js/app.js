window.mua = angular.module('mua', ['store']);

// global ctrlers
mua.ctrlers = {
    article: function($scope, Store) {
        $scope.submit = function(articleID) {
            $scope.article.content = $('#editor').html();
            // 在不变更url的前提下
            if (articleID) {
                Store.article.update({
                    id: articleID,
                    article: $scope.article,
                    url: $scope.article.url
                }, function(result) {
                    if (result.stat == 'ok') {
                        window.location.href = '/article/' + result.url;
                    } else {
                        $scope.msg = result.msg;
                    }
                });
            } else {
                Store.article.save({
                    article: $scope.article
                }, function(result) {
                    if (result.stat == 'ok') {
                        window.location.href = '/article/' + result.article.url;
                    } else {
                        $scope.msg = result.msg;
                    }
                });
            }
        }
        $scope.destroy = function(id) {
            Store.article.delete({
                id: id
            }, function(result){
                console.log(result);
            })
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