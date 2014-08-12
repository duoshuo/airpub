// Meta directive
// todo: parse configs obejct to deps
airpub.directive('metaBackground', function($upyun) {
  return {
    restrict: 'AE',
    require: 'ngModel',
    replace: true,
    template: [
      '<div id="metaBackground" class="meta-background clearfix">',
        '<form name="metaBackgroundForm" ng-submit="uploadBackground()">',
          '<input type="file" name="file" id="uploadBackgroundBtn" class="pull-left"/>',
          '<button type="submit" class="btn btn-default pull-right">',
          '上传背景图片',
          '</button>',
        '</form>',
      '</div>'
    ].join('\n'),
    link: function(scope, element, attrs, ctrl) {
      var $ = angular.element;
      var uploading = false;

      // upyun configs
      $upyun.set('bucket', airpubConfigs.upyun.bucket);
      $upyun.set('form_api_secret', airpubConfigs.upyun.form_api_secret);

      // model => view
      ctrl.$render = function() {
        fillBackgroundImage(ctrl.$viewValue);
      };

      // upload images and fill uri
      scope.uploadBackground = function() {
        // begin upload
        if (uploading) return;
        uploading = true;
        $upyun.upload('metaBackgroundForm', function(err, response, image) {
          uploading = false;
          if (err) return console.error(err);
          var uploadOk = image.code === 200 && image.message === 'ok';
          if (!uploadOk) return;
          // fill image
          fillBackgroundImage(image.absUrl);
          // view => model
          ctrl.$setViewValue(image.absUrl);
        });
      }

      function fillBackgroundImage(uri) {
        if (!uri) return;
        if (uri.indexOf('http') !== 0) return;
        var hd = document.getElementsByTagName('header')[0];
        if (!hd) return;
        $(hd).css({
          'background-image': 'url(' + uri + ')'
        });
      }
    }
  }
});