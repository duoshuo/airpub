var airpubConfigs = {};

// 博客名称
airpubConfigs.name = 'Airpub';

// 简单介绍
airpubConfigs.description = '轻如蝉翼的写作工具';

// 博客首页的固定链接
airpubConfigs.url = 'http://yourUri.com';

// 又拍云上传配置
// 推荐使用 upyun-sign 生成短期签名的方式，不暴露 key 实现上传
// 具体可以参考 https://github.com/turingou/upyun-sign
airpubConfigs.upyun = {
  sign: '', // upyun-sign 生成的签名
  policy: '', // upyun-sign 生成的 policy
  // bucket: 'mybucket',
  // form_api_secret: 'xxxxxx', // 可选参数
  // uri: 'http://{{bucketName}}.b0.upaiyun.com', // 可选参数
  // endpoint: 'http://v0.api.upyun.com/{{bucketName}}', // 可选参数
};

// 多说配置
var duoshuoQuery = {
  short_name: '{{your_duoshuo_short_name}}'
};