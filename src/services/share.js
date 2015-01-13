;(function() {
  'use strict';

  angular
    .module('airpub')
    .service('share', [shareService]);

  function shareService() {
    var defaults = {
      title: 'Airpub',
      link: 'http://airpub.io',
      desc: '基于 Angular.js 搭建，多说数据驱动的纯前端写作工具。'
    };

    this.wechat = wechatShare;

    function wechatShare(article) {
      if (!window.wechat)
        return;

      var wechat = window.wechat;
      var data = {};
      
      angular.forEach([
        'title', 
        'link',
        'desc'
      ], function(item){
        data[item] = article[item] || defaults[item];
      });

      wechat('friend', data);
      wechat('timeline', data);
      wechat('weibo', data);
    }
  }
})();
