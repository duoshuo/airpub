airpub.directive('editor', function($upyun) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, iElement, iAttrs, ctrl) {
      // add class
      angular.element(iElement).addClass('editor');
      // check if lepture's editor class exists
      if (!window.Editor) return false;
      // init editor instance
      window.editor = new Editor({
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
      editor.codemirror.on('change', onChange);

      // model => view
      ctrl.$render = function() {
        if (!editor) return;
        editor.codemirror.setValue(
          ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue
        );
      };

      // view => model
      function onChange() {
        ctrl.$setViewValue(editor.codemirror.getValue());
      }

      // upload images and fill uri
      function uploadAndDrawImage() {
        var cm = editor.codemirror;
        var stat = editor.getState(cm);
        if (!$upyun) {
          return editor._replaceSelection(cm, stat.image, 
            '![', '](http://)' // uri to be filled.
          );
        }
        
      }
    }
  }
});
