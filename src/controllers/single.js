;
(function(angular, debug) {
  'use strict';

  angular
    .module('airpub')
    .controller('single', [
      '$scope',
      '$state',
      'duoshuo',
      '$rootScope',
      singleArticleCtrler
    ]);

  function singleArticleCtrler($scope, $state, duoshuo, $rootScope) {
    if (!$state.params.uri)
      return $state.go('layout.404');

    // Expose locals to templates
    $scope.threadId = $state.params.uri;

    // Read from cache
    if ($scope.article)
      return;

    // Fetch article details
    fetchFreshDetail($state.params.uri);

    function fetchFreshDetail(thread_id) {
      var query = {};
      query.thread_id = thread_id;

      // Open a request
      duoshuo.get(
        'threads/details',
        query,
        onSuccess,
        onError
      );

      function onSuccess(err, result) {
        if (err)
          return $scope.addAlert('文章内容获取失败，请稍后再试...', 'danger');

        // Expose locals to templates
        $scope.article = result;

        // Update title and desciption
        $rootScope.$emit('updateMeta', {
          title: result.title,
          description: fetchDesciption(result.content)
        });

        // Update background if required.
        if (result.meta && result.meta.background)
          $scope.updateBackground(result.meta.background);

        // Init wechat share
        // if ($scope.article)
        //   initWeixinShare($scope.article)

        // Fetch authors' profile
        if (!result.author_id)
          return;

        fetchUserProfile(result);
      }

      function onError(err) {
        return $state.go('layout.404');
      }

      function fetchDesciption(text) {
        var maxLength = 80;
        if (!text)
          return '';

        if (text.length <= maxLength)
          return text;

        return text.substr(0, maxLength) + '...';
      }
    }

    function fetchUserProfile(result) {
      var query = {};
      query.user_id = result.author_id;

      // Open a request
      duoshuo.get('users/profile', query, onSuccess);

      function onSuccess(err, result) {
        // Ignore null profile
        if (err) return;

        $scope.author = result;
        $scope.author.description = result.connected_services.weibo ?
          result.connected_services.weibo.description :
          null;
      }
    }
  }

  function initWeixinShare(article) {
    if (!window.wechat)
      return;

    var limit = 42;
    var data = {};

    data.link = article.url;
    data.title = article.title;
    data.desc = article.content.substr(0, limit) + (article.content.length > limit ? '...' : '');

    if (article.meta && article.meta.background)
      data.img = article.meta.background;

    // TODO: Remove hardcode here, replace key `wechatSharePic` with a anchor
    if (article.meta && article.meta.wechatSharePic)
      data.img = article.meta.wechatSharePic;

    if (airpubConfigs.wechat && airpubConfigs.wechat.appId)
      data.app = airpubConfigs.wechat.appId;

    window.wechat('friend', data);
    window.wechat('timeline', data);
    window.wechat('weibo', data);
  }
})(window.angular, window.debug);
