// Meta directive
// todo: parse configs obejct to deps
airpub.directive('metaBackground', function($upyun) {
  return {
    restrict: 'AE',
    require: 'ngModel',
    link: function(scope, iElement, iAttrs, ctrl) {
      var $ = angular.element;

      // upyun configs
      if (validUploadConfigs) {
        $upyun.set('bucket', airpubConfigs.upyun.bucket);
        $upyun.set('form_api_secret', airpubConfigs.upyun.form_api_secret);
      }

      // model => view
      ctrl.$render = function() {
        editor.codemirror.setValue(
          ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue
        );
      };

      function fillBackgroundImage() {
        
      }

      // upload images and fill uri
      function uploadBackgroundImage() {
        var uploading = false;
        // if (!document.getElementById('fileUpload')) {
        //   var hiddenInputFile = document.createElement('input');
        //   hiddenInputFile.id = 'fileUpload';
        //   hiddenInputFile.type = 'file';
        //   hiddenInputFile.name = 'file';
        //   hiddenInputFile.style.display = 'none';
        //   $(iElement).after(hiddenInputFile);
        // }
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
            // fill image
            fillBackgroundImage(image.absUrl);
            // view => model
            ctrl.$setViewValue(image.absUrl);
          });
        });
      }
    }
  }
});
