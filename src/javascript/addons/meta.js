airpub.directive('meta', function($upyun) {
  return {
    restrict: 'AE',
    require: 'ngModel',
    link: function(scope, iElement, iAttrs, ctrl) {
      var $ = angular.element;
      
      // upyun configs
      $upyun.set('bucket','upyun-form');
      $upyun.set('form_api_secret', 'IRoTyNc75husfQD24cq0bNmRSDI=');

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
        var uploading = false;
        var cm = editor.codemirror;
        var stat = editor.getState(cm);
        if (!$upyun) {
          return editor._replaceSelection(cm, stat.image, 
            '![', '](http://)' // uri to be filled.
          );
        }
        if (!document.getElementById('fileUpload')) {
          var hiddenInputFile = document.createElement('input');
          hiddenInputFile.id = 'fileUpload';
          hiddenInputFile.type = 'file';
          hiddenInputFile.name = 'file';
          hiddenInputFile.style.display = 'none';
          $(iElement).after(hiddenInputFile);
        }
        // trigger click
        var inputButton = document.getElementById('fileUpload');
        inputButton.click();
        // begin upload
        $(inputButton).on('change', function(eve) {
          if (uploading) return;
          uploading = true;
          $upyun.upload(iAttrs.formName, function(err, response, image){
            uploading = false;
            if (err) return console.error(err);
            var uploadOk = image.code === 200 && image.message === 'ok';
            if (!uploadOk) return;
            editor._replaceSelection(cm, stat.image, 
              '![', '](' + image.absUrl + ')' // uri to be filled.
            );
          });
        });
      }
    }
  }
});
