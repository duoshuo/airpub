// admin ctrler
airpub.controller('admin', function($scope, $state, $upyun, $duoshuo) {

  var editor = new Editor({
    toolbar: [
      {name: 'bold', action: Editor.toggleBold},
      {name: 'italic', action: Editor.toggleItalic},
      '|',
      {name: 'quote', action: Editor.toggleBlockquote},
      {name: 'unordered-list', action: Editor.toggleUnOrderedList},
      {name: 'ordered-list', action: Editor.toggleOrderedList},
      '|',
      {name: 'link', action: Editor.drawLink},
      {name: 'image', action: uploadAndDrawImage},
      '|',
      {name: 'preview', action: Editor.togglePreview},
      {name: 'fullscreen', action: Editor.toggleFullScreen}
    ]
  });

  editor.render();
  editor.codemirror.on('change', function(){
    if (!$scope.article) $scope.article = {};
    $scope.article.content = editor.codemirror.getValue();
  });

  function uploadAndDrawImage(editor) {
    var cm = editor.codemirror;
    var stat = editor.getState(cm);
    editor._replaceSelection(cm, stat.image, '![', '](' + 'http://123123123.jpg' + ')');
  }

  $scope.createArticle = function() {
    console.log($scope.article);
  };

});
