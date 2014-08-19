var airpubConfigs = {
  // blog name
  name: 'Airpub',
  // just a little description
  description: '轻如蝉翼的写作工具',
  // blog uri
  url: 'http://yourUri.com',
  // blog theme
  // theme: 'my-theme',
  // for images upload
  upyun: {
    bucket: 'mybucket',
    uri: 'http://{{bucketName}}.b0.upaiyun.com',
    endpoint: 'http://v0.api.upyun.com/{{bucketName}}',
    form_api_secret: 'xxxxxx'
  }
}

// for backend service
var duoshuoQuery = {
  short_name: '{{your_duoshuo_short_name}}'
};
