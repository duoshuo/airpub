// admin ctrler
airpub.controller('admin', function($scope, $state) {
  $('#editor').mediumInsert({
    editor: editor,
    addons: {
      images: {},
      embeds: {}
    }
  });
  NProgress.done();
});
