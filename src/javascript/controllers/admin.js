// admin ctrler
airpub.controller('admin', function($scope, $state, $base64, $md5) {
  // clear progress
  NProgress.done();

  $('#editor').mediumInsert({
    editor: editor,
    addons: {
      images: {
        useDragAndDrop: true,
        uploadFile: uploadImage
      },
      embeds: {
        urlPlaceholder: '贴入图片链接地址'
      }
    }
  });

  // shoude be wrapped as a service
  function uploadImage($placeholder, file, self) {
    var upyunConfigs = $scope.configs.upyun;

    if (!JSON) return;
    if (!window.FormData) return;
    if (!window.XMLHttpRequest) return;
    if (!upyunConfigs) return;

    console.log(file);

    var data = new FormData();
    var req = new XMLHttpRequest();
    var policy = $base64.encode(JSON.stringify({
      bucket: 'airpub',
      expiration: 1000 * 60,
      'save-key': '/{year}/{mon}/{day}/upload_{filename}{.suffix}',
      'allow-file-type': 'jpg,gif,png'
    }));

    data.append('file', file);
    data.append('policy', policy);
    data.append('signature', $md5(policy + upyunConfigs.form_api_secret));

    req.open(
      'POST', 
      upyunConfigs.endpoint || 'http://v0.api.upyun.com/' + upyunConfigs.bucket,
      true
    );

    req.addEventListener('error', function() {
      alert('上传失败了...稍后再试试吧'); // todo
    }, false);

    req.addEventListener('load', function(result) {
      var statusCode = result.target.status;
      if (statusCode !== 200) return alert('上传失败了...稍后再试试吧');
      try {
        var data = JSON.parse(this.responseText);
        if (data.status !== 'ok') {
          alert('upload success');
        }
        // final success !
        return callback(null, data);
      } catch (err) {
        console.error(err);
        alert('JSON parse error');
      }
    }, false);

    // the process monitor
    req.upload.addEventListener('progress', function(pe) {
      if (!pe.lengthComputable) return;
      NProgress.set(Math.round(pe.loaded / pe.total * 100));
    });

    // send data to server 
    req.send(data);

    NProgress.start();

    function callback(err, data) {
      console.log(data);
    }
  }

});
